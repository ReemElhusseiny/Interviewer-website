// import { Users } from 'lucide-react';
// import { auth, clerkClient } from "@clerk/nextjs/server";
// import { StreamClient } from "@stream-io/node-sdk";
// import { NextResponse } from "next/server";

// export async function GET() {
//   // جلب بيانات المستخدم الحالي من سياق request
//   const { userId } = await auth();

//   if (!userId) {
//     return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
//   }

//   // الحصول على بيانات المستخدم الكاملة من Clerk
//   const user = await (await clerkClient()).users.getUser(userId);

//   // إنشاء StreamClient
//   const streamClient = new StreamClient(
//     process.env.NEXT_PUBLIC_STREAM_API_KEY!,
//     process.env.STREAM_SECRET_KEY!
//   );

//   // توليد Token للمستخدم
//   const token = streamClient.generateUserToken({ user_id: user.id });

//   // إعادة البيانات كـ JSON
//   return NextResponse.json({ token, user: { id: user.id, firstName: user.firstName, email: user.emailAddresses[0].emailAddress } });
// }
// app/api/stream/token/route.ts
import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

export async function GET() {
  const user = await currentUser();
  console.log("USERR", user)
  if (!user) return new Response(JSON.stringify({ error: "Unauthenticated" }), { status: 401 });

  const client = new StreamClient(
    process.env.NEXT_PUBLIC_STREAM_API_KEY!,
    process.env.STREAM_SECRET_KEY!
  );

  const token = client.generateUserToken({ user_id: user.id });

  return new Response(JSON.stringify({ token }), { status: 200 });
}

