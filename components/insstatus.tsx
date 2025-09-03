import { useRouter } from "next/navigation";

export default function InsStatus({ size }: { size: "sm" | "md" | "lg" }) {
  const router = useRouter();
  return (
    <div
      className="pt-2 hover:cursor-grab"
      style={{ width: 235, height: 61 }}
      onClick={() => {
        router.push("/status");
      }}
    >
      <iframe
        className="pointer-events-none"
        src={`https://paperbazaar.instatus.com/embed-status/adec06c2/light-${size}`}
        width={size === "sm" ? 235 : size === "md" ? 240 : 250}
        height="61"
        style={{ border: "none" }}
        tabIndex={-1}
        aria-hidden="true"
      ></iframe>
    </div>
  );
}
