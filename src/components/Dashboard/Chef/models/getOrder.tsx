import axios from "axios";
import { Order } from "@/types/entity";

export async function getOrder() {
  const url: string = "http://localhost:3000/api/chef";
  try {
    const response = await axios.get(url);
    const data: Order[] = response.data.data;

    return data as Order[];
  } catch (error) {
    console.error(error);
  }
}
