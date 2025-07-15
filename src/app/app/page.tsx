"use client";
import { useAuth } from "@/hooks/useAuth";

export default function App() {
  const { user } = useAuth();
  return <div>{user?.name}&apos;s dashboard</div>;
}
