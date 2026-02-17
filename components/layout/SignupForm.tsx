// components/SignupForm.tsx
export default function SignupForm() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Create Account</h2>
      <form className="space-y-4">
        <div>
          <label className="block mb-2">Full Name</label>
          <input 
            type="text" 
            className="w-full p-3 border rounded-lg"
            placeholder="Enter your name"
          />
        </div>
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
            placeholder="Create password"
          />
        </div>
        <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition">
          Sign Up
        </button>
      </form>
    </div>
  );
}