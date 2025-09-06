import { useLocation } from "react-router-dom";

export default function VerifyResult() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const status = params.get("status");
  const message = params.get("message");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="p-6 bg-white shadow-lg rounded-xl text-center">
        <h2 className={`text-xl font-bold mb-4 ${status === "success" ? "text-green-600" : "text-red-600"}`}>
          {status === "success" ? "✅ Verification Successful" : "❌ Verification Failed"}
        </h2>
        <p className="text-gray-700">{message}</p>
      </div>
    </div>
  );
}