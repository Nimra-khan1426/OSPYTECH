// components/LoginForm.tsx
export default function LoginForm() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Login to Account</h2>
      <form className="space-y-4">
        <div>
          <label className="block mb-2">Email</label>
          <input 
            type="email" 
            className="w-full p-3 border rounded-lg"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className="block mb-2">Password</label>
          <input 
            type="password" 
            className="w-full p-3 border rounded-lg"
            placeholder="Enter your password"
          />
        </div>
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
          Login
        </button>
      </form>
    </div>
  );
}