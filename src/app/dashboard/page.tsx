import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import Stripe from "stripe";
import { createCheckoutLink, createCustomerIfNull, generateCustomerPortalLink, hasSubscription } from "../helper/billing";
import Link from "next/link";

export const stripe = new Stripe(String(process.env.STRIPE_SECRET), {
  apiVersion: "2024-04-10",
});

const dashboard = async () => {
  const session = await getServerSession(authOptions);
  await createCustomerIfNull();

  const user = await prisma.user.findFirst({where: { email: session?.user?.email }});
  const manage_link = await generateCustomerPortalLink(""+user?.stripe_customer_id);
  const hasSUB =  await hasSubscription();
  const checkput_link = await createCheckoutLink(""+user?.stripe_customer_id);
  return (
    <div className="max-w-4xl m-auto w-full px-4 ">
      <div className="flex flex-col">
        <p className=" text-2xl font-medium">
          {session?.user?.name} , ur loged in congrats!
        </p>
<div className="mt-4">
      <Link  className="bg-white ml-auto   text-black rounded-md px-2 py-2" href={""+manage_link}> manage billing here </Link>
</div>
<div className=" text-2-xl font-bold "> {
hasSUB? <p className="p-4 mt-5 rounded-md border-emerald-400 border shadow-sm font-medium  "> You have a subscription </p> : <p className="p-4  mt-5 rounded-md border-zinc-400 border shadow-sm font-medium "> sorry {user.name} You dont have a subscription ! pls buy subscription and enjoy the game 
<Link className="text-2l ml-3  bg-white  text-black rounded-md px-2 py-2" href={""+checkput_link}>click to buy</Link>
</p>
}</div>
  
      </div>
     </div>
  );
}; 

export default dashboard;
