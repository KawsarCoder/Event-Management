"use server";
/* eslint-disable */
import {
  createUser,
  findUserByCredentials,
  getEventById,
  updateGoing,
  updateInterest,
} from "@/db/queries";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Resend } from "resend";
import EmailTemplate from "../payment/EmailTemplate";

async function registerUser(formData) {
  const user = Object.fromEntries(formData);
  const created = await createUser(user); // eslint-disable-line no-unused-vars
  redirect("/login");
}

async function perFormLogin(formData) {
  try {
    const credential = {};
    credential.email = formData.get("email");
    credential.password = formData.get("password");
    const found = await findUserByCredentials(credential);

    return found;
  } catch (err) {
    throw err;
  }
}

async function addInterestedEvent(eventId, authId) {
  try {
    await updateInterest(eventId, authId);
  } catch (err) {
    throw err;
  }
  revalidatePath("/");
}

async function addGoingEvent(eventId, user) {
  try {
    await updateGoing(eventId, user?.id);
    await sendEmail(eventId, user);
  } catch (err) {
    throw err;
  }

  revalidatePath("/");

  redirect("/");
}

async function sendEmail(eventId, user) {
  try {
    const event = await getEventById(eventId);

    const resend = new Resend(process.env.RESEND_API_KEY);
    const message = `Dear ${user?.name}, you have been successfully registered for the event, ${event?.name}. Please carry this email and your official id to the venue. We are excited to have you here`;

    const sent = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "md.kawsar.developer@gmail.com", //user?.email - use this when have a domain
      subject: "Successfully Registered for the event!",
      react: EmailTemplate({ message }),
    });
  } catch (err) {
    throw err;
  }
}

export { registerUser, perFormLogin, addInterestedEvent, addGoingEvent };
