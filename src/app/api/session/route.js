import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request){
    const session = await getServerSession(authOptions)

    return Response.json({
        message: "Session",
        session
    })
}