"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, deleteUser, updateProfile, updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, storage } from "@/lib/firebase";
import { FiUser, FiLock, FiBell, FiLogOut, FiCamera, FiSave, FiTrash2, FiMail, FiPhone, FiMapPin, FiBriefcase, FiMessageSquare } from "react-icons/fi";

export default function AccountSettings() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Profile Fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [uploading, setUploading] = useState(false);

  // Security Fields
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Notifications
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

  // Status Fields
  const [careerStatus, setCareerStatus] = useState("pending");
  const [contactStatus, setContactStatus] = useState("read");
  const [lastLogin, setLastLogin] = useState("");

  // Sirf required tabs rakh raha hoon
  const tabs = [
    { id: "profile", label: "Profile", icon: <FiUser /> },
    { id: "security", label: "Security", icon: <FiLock /> },
    { id: "notifications", label: "Notifications", icon: <FiBell /> },
    { id: "status", label: "Status", icon: <FiBriefcase /> },
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login");
      } else {
        setUser(currentUser);
        const nameParts = currentUser.displayName?.split(" ") || ["", ""];
        setFirstName(nameParts[0] || "");
        setLastName(nameParts.slice(1).join(" ") || "");
        setEmail(currentUser.email || "");
        setProfilePic(currentUser.photoURL || "/avatar.png");
        setPhone(currentUser.phoneNumber || "");
        
        // Set last login
        if (currentUser.metadata.lastLoginAt) {
          const lastLoginTime = new Date(parseInt(currentUser.metadata.lastLoginAt));
          setLastLogin(lastLoginTime.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }));
        }
        
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ 
          width: '50px', 
          height: '50px', 
          border: '5px solid #f3f3f3', 
          borderTop: '5px solid #3b82f6', 
          borderRadius: '50%', 
          animation: 'spin 1s linear infinite', 
          margin: '0 auto 20px' 
        }}></div>
        <p style={{ color: '#666' }}>Loading your account...</p>
      </div>
    </div>
  );

  // Upload profile picture
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size should be less than 5MB");
      return;
    }

    setUploading(true);
    try {
      const storageRef = ref(storage, `profilePics/${user.uid}_${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setProfilePic(url);
      
      // Update in Firebase Auth
      await updateProfile(user, { photoURL: url });
      alert("Profile picture updated successfully!");
    } catch (err) {
      alert("Upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  // Save profile
  const handleSaveProfile = async () => {
    try {
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`.trim(),
        photoURL: profilePic,
      });
      
      if (email !== user.email) {
        await updateEmail(user, email);
      }
      
      alert("Profile updated successfully!");
    } catch (err) {
      if (err.code === 'auth/requires-recent-login') {
        alert("Please re-login to update email");
      } else {
        alert("Error updating profile: " + err.message);
      }
    }
  };

  // Update password
  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    
    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      
      alert("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      alert("Error updating password: " + err.message);
    }
  };

  // Delete account
  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost!")) {
      deleteUser(user)
        .then(() => {
          alert("Account deleted successfully!");
          router.push("/login");
        })
        .catch((err) => alert(err.message));
    }
  };

  // Logout
  const handleLogout = () => {
    auth.signOut().then(() => {
      router.push("/login");
    });
  };

  // Badge styles
  const getBadgeStyle = (status) => {
    switch(status) {
      case "received":
      case "read":
      case "active":
        return { backgroundColor: "#d1fae5", color: "#065f46" };
      case "pending":
      case "unread":
        return { backgroundColor: "#fef3c7", color: "#92400e" };
      case "rejected":
      case "blocked":
        return { backgroundColor: "#fee2e2", color: "#b91c1c" };
      default:
        return { backgroundColor: "#f3f4f6", color: "#6b7280" };
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case "pending": return "Pending Review";
      case "read": return "Read";
      case "received": return "Received";
      case "active": return "Active";
      case "unread": return "Unread";
      default: return status || "No Status";
    }
  };

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      backgroundColor: "#f8fafc",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    }}>
      
      {/* Sidebar */}
      <div style={{
        width: "280px",
        backgroundColor: "white",
        padding: "30px 20px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        borderRight: "1px solid #e5e7eb",
        display: "flex",
        flexDirection: "column",
      }}>
        <div style={{ marginBottom: "40px" }}>
          <h1 style={{
            fontSize: "24px",
            fontWeight: "700",
            color: "#111827",
            marginBottom: "5px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}>
            <FiUser /> Account Settings
          </h1>
          <p style={{ color: "#6b7280", fontSize: "14px" }}>
            Manage your account preferences
          </p>
        </div>

        <div style={{ flex: 1 }}>
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "14px 16px",
                borderRadius: "10px",
                marginBottom: "8px",
                cursor: "pointer",
                backgroundColor: activeTab === tab.id ? "#eff6ff" : "transparent",
                color: activeTab === tab.id ? "#1d4ed8" : "#4b5563",
                fontWeight: activeTab === tab.id ? "600" : "500",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                transition: "all 0.2s",
                border: "1px solid",
                borderColor: activeTab === tab.id ? "#dbeafe" : "transparent",
              }}
            >
              <span style={{ fontSize: "18px" }}>{tab.icon}</span>
              {tab.label}
            </div>
          ))}
        </div>

        <div style={{ marginTop: "auto", borderTop: "1px solid #e5e7eb", paddingTop: "20px" }}>
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              backgroundColor: "transparent",
              color: "#4b5563",
              fontWeight: "500",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#f3f4f6"}
            onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
          >
            <FiLogOut /> Logout
          </button>
          
          <button
            onClick={handleDeleteAccount}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#fee2e2",
              color: "#dc2626",
              fontWeight: "500",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              marginTop: "12px",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#fecaca"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#fee2e2"}
          >
            <FiTrash2 /> Delete Account
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "40px", overflowY: "auto" }}>
        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div>
            <div style={{ marginBottom: "40px" }}>
              <h2 style={{ fontSize: "28px", fontWeight: "700", color: "#111827", marginBottom: "10px" }}>Profile Settings</h2>
              <p style={{ color: "#6b7280" }}>Update your personal information and profile picture</p>
            </div>

            <div style={{
              backgroundColor: "white",
              borderRadius: "16px",
              padding: "32px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              border: "1px solid #e5e7eb",
            }}>
              {/* Profile Picture Section */}
              <div style={{ display: "flex", alignItems: "center", marginBottom: "40px", gap: "30px" }}>
                <div style={{ position: "relative" }}>
                  <img
                    src={profilePic}
                    alt="Profile"
                    style={{ 
                      width: "120px", 
                      height: "120px", 
                      borderRadius: "50%", 
                      objectFit: "cover", 
                      border: "4px solid #e5e7eb" 
                    }}
                  />
                  <label style={{
                    position: "absolute",
                    bottom: "0",
                    right: "0",
                    backgroundColor: "#3b82f6",
                    color: "white",
                    borderRadius: "50%",
                    width: "36px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    border: "3px solid white",
                  }}>
                    <FiCamera />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleUpload}
                      disabled={uploading}
                      style={{ display: "none" }}
                    />
                  </label>
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px" }}>Profile Picture</h3>
                  <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "16px" }}>
                    Upload a clear photo of yourself. Recommended size: 500x500px
                  </p>
                  <div style={{ display: "flex", gap: "12px" }}>
                    <input
                      type="text"
                      value={profilePic}
                      onChange={(e) => setProfilePic(e.target.value)}
                      placeholder="Or enter image URL"
                      style={{ 
                        flex: 1, 
                        padding: "10px 14px", 
                        borderRadius: "8px", 
                        border: "1px solid #d1d5db",
                        fontSize: "14px"
                      }}
                    />
                    {uploading && (
                      <div style={{ 
                        padding: "10px 14px", 
                        backgroundColor: "#eff6ff", 
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px"
                      }}>
                        <div style={{ 
                          width: "16px", 
                          height: "16px", 
                          border: "2px solid #93c5fd", 
                          borderTopColor: "transparent", 
                          borderRadius: "50%", 
                          animation: "spin 1s linear infinite" 
                        }}></div>
                        Uploading...
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div style={{ marginBottom: "40px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <FiUser /> Personal Information
                </h3>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px", color: "#374151" }}>First Name *</label>
                    <input
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Enter first name"
                      required
                      style={{ 
                        width: "100%", 
                        padding: "12px 16px", 
                        borderRadius: "8px", 
                        border: "1px solid #d1d5db",
                        fontSize: "15px",
                        transition: "all 0.2s"
                      }}
                      onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
                      onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px", color: "#374151" }}>Last Name *</label>
                    <input
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Enter last name"
                      required
                      style={{ 
                        width: "100%", 
                        padding: "12px 16px", 
                        borderRadius: "8px", 
                        border: "1px solid #d1d5db",
                        fontSize: "15px"
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px", color: "#374151", display: "flex", alignItems: "center", gap: "6px" }}>
                      <FiMail /> Email Address *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      required
                      style={{ 
                        width: "100%", 
                        padding: "12px 16px", 
                        borderRadius: "8px", 
                        border: "1px solid #d1d5db",
                        fontSize: "15px"
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px", color: "#374151", display: "flex", alignItems: "center", gap: "6px" }}>
                      <FiPhone /> Phone Number
                    </label>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      style={{ 
                        width: "100%", 
                        padding: "12px 16px", 
                        borderRadius: "8px", 
                        border: "1px solid #d1d5db",
                        fontSize: "15px"
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px", color: "#374151", display: "flex", alignItems: "center", gap: "6px" }}>
                    <FiMapPin /> Address
                  </label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your complete address"
                    rows="3"
                    style={{ 
                      width: "100%", 
                      padding: "12px 16px", 
                      borderRadius: "8px", 
                      border: "1px solid #d1d5db",
                      fontSize: "15px",
                      resize: "vertical"
                    }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "16px" }}>
                <button
                  onClick={() => {
                    const nameParts = user.displayName?.split(" ") || ["", ""];
                    setFirstName(nameParts[0] || "");
                    setLastName(nameParts.slice(1).join(" ") || "");
                    setEmail(user.email || "");
                    setProfilePic(user.photoURL || "/avatar.png");
                    setPhone(user.phoneNumber || "");
                    setAddress("");
                  }}
                  style={{
                    padding: "12px 24px",
                    borderRadius: "8px",
                    border: "1px solid #d1d5db",
                    backgroundColor: "transparent",
                    color: "#374151",
                    fontWeight: "600",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "all 0.2s",
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = "#f3f4f6"}
                  onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
                >
                  Reset
                </button>
                <button
                  onClick={handleSaveProfile}
                  disabled={!firstName.trim() || !lastName.trim() || !email.trim()}
                  style={{
                    padding: "12px 28px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: !firstName.trim() || !lastName.trim() || !email.trim() ? "#9ca3af" : "#3b82f6",
                    color: "white",
                    fontWeight: "600",
                    cursor: !firstName.trim() || !lastName.trim() || !email.trim() ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "all 0.2s",
                  }}
                  onMouseOver={(e) => {
                    if (firstName.trim() && lastName.trim() && email.trim()) {
                      e.target.style.backgroundColor = "#2563eb";
                    }
                  }}
                  onMouseOut={(e) => {
                    if (firstName.trim() && lastName.trim() && email.trim()) {
                      e.target.style.backgroundColor = "#3b82f6";
                    }
                  }}
                >
                  <FiSave /> Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
          <div>
            <div style={{ marginBottom: "40px" }}>
              <h2 style={{ fontSize: "28px", fontWeight: "700", color: "#111827", marginBottom: "10px" }}>Security Settings</h2>
              <p style={{ color: "#6b7280" }}>Manage your password and security preferences</p>
            </div>

            <div style={{
              backgroundColor: "white",
              borderRadius: "16px",
              padding: "32px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              border: "1px solid #e5e7eb",
            }}>
              {/* Change Password */}
              <div style={{ marginBottom: "40px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <FiLock /> Change Password
                </h3>
                
                <div style={{ display: "grid", gap: "20px", maxWidth: "500px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px", color: "#374151" }}>Current Password</label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                      style={{ 
                        width: "100%", 
                        padding: "12px 16px", 
                        borderRadius: "8px", 
                        border: "1px solid #d1d5db",
                        fontSize: "15px"
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px", color: "#374151" }}>New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      style={{ 
                        width: "100%", 
                        padding: "12px 16px", 
                        borderRadius: "8px", 
                        border: "1px solid #d1d5db",
                        fontSize: "15px"
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px", color: "#374151" }}>Confirm New Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      style={{ 
                        width: "100%", 
                        padding: "12px 16px", 
                        borderRadius: "8px", 
                        border: "1px solid #d1d5db",
                        fontSize: "15px"
                      }}
                    />
                  </div>
                  
                  <button
                    onClick={handleUpdatePassword}
                    disabled={!currentPassword || !newPassword || !confirmPassword}
                    style={{
                      padding: "12px 24px",
                      borderRadius: "8px",
                      border: "none",
                      backgroundColor: !currentPassword || !newPassword || !confirmPassword ? "#9ca3af" : "#3b82f6",
                      color: "white",
                      fontWeight: "600",
                      cursor: !currentPassword || !newPassword || !confirmPassword ? "not-allowed" : "pointer",
                      width: "fit-content",
                      transition: "all 0.2s",
                    }}
                    onMouseOver={(e) => {
                      if (currentPassword && newPassword && confirmPassword) {
                        e.target.style.backgroundColor = "#2563eb";
                      }
                    }}
                    onMouseOut={(e) => {
                      if (currentPassword && newPassword && confirmPassword) {
                        e.target.style.backgroundColor = "#3b82f6";
                      }
                    }}
                  >
                    Update Password
                  </button>
                </div>
              </div>

              {/* Recent Activity */}
              <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: "30px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "20px" }}>Recent Activity</h3>
                <div style={{ backgroundColor: "#f9fafb", padding: "20px", borderRadius: "10px" }}>
                  <div style={{ marginBottom: "12px" }}>
                    <span style={{ fontWeight: "500" }}>Last Login:</span>{" "}
                    <span style={{ color: "#6b7280" }}>{lastLogin || "Not available"}</span>
                  </div>
                  <div style={{ color: "#6b7280", fontSize: "14px" }}>
                    Account created on {user?.metadata?.creationTime || "Unknown date"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <div>
            <div style={{ marginBottom: "40px" }}>
              <h2 style={{ fontSize: "28px", fontWeight: "700", color: "#111827", marginBottom: "10px" }}>Notification Settings</h2>
              <p style={{ color: "#6b7280" }}>Control how and when you receive notifications</p>
            </div>

            <div style={{
              backgroundColor: "white",
              borderRadius: "16px",
              padding: "32px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              border: "1px solid #e5e7eb",
            }}>
              <div style={{ marginBottom: "30px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <FiBell /> Email Notifications
                </h3>
                
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", border: "1px solid #e5e7eb", borderRadius: "8px" }}>
                  <div>
                    <div style={{ fontWeight: "600", marginBottom: "4px" }}>Account Notifications</div>
                    <p style={{ color: "#6b7280", fontSize: "14px" }}>
                      Important updates about your account
                    </p>
                  </div>
                  <label style={{ position: "relative", display: "inline-block", width: "44px", height: "24px" }}>
                    <input
                      type="checkbox"
                      checked={emailNotifications}
                      onChange={(e) => setEmailNotifications(e.target.checked)}
                      style={{ opacity: 0, width: 0, height: 0 }}
                    />
                    <span style={{
                      position: "absolute",
                      cursor: "pointer",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: emailNotifications ? "#10b981" : "#d1d5db",
                      transition: "0.4s",
                      borderRadius: "34px",
                    }}>
                      <span style={{
                        position: "absolute",
                        content: "",
                        height: "18px",
                        width: "18px",
                        left: "3px",
                        bottom: "3px",
                        backgroundColor: "white",
                        transition: "0.4s",
                        borderRadius: "50%",
                        transform: emailNotifications ? "translateX(20px)" : "translateX(0)"
                      }} />
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "20px" }}>Push Notifications</h3>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", border: "1px solid #e5e7eb", borderRadius: "8px" }}>
                  <div>
                    <div style={{ fontWeight: "600", marginBottom: "4px" }}>Push Notifications</div>
                    <p style={{ color: "#6b7280", fontSize: "14px" }}>
                      Receive notifications on your device
                    </p>
                  </div>
                  <label style={{ position: "relative", display: "inline-block", width: "44px", height: "24px" }}>
                    <input
                      type="checkbox"
                      checked={pushNotifications}
                      onChange={(e) => setPushNotifications(e.target.checked)}
                      style={{ opacity: 0, width: 0, height: 0 }}
                    />
                    <span style={{
                      position: "absolute",
                      cursor: "pointer",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: pushNotifications ? "#10b981" : "#d1d5db",
                      transition: "0.4s",
                      borderRadius: "34px",
                    }}>
                      <span style={{
                        position: "absolute",
                        content: "",
                        height: "18px",
                        width: "18px",
                        left: "3px",
                        bottom: "3px",
                        backgroundColor: "white",
                        transition: "0.4s",
                        borderRadius: "50%",
                        transform: pushNotifications ? "translateX(20px)" : "translateX(0)"
                      }} />
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Status Tab */}
        {activeTab === "status" && (
          <div>
            <div style={{ marginBottom: "40px" }}>
              <h2 style={{ fontSize: "28px", fontWeight: "700", color: "#111827", marginBottom: "10px" }}>Status</h2>
              <p style={{ color: "#6b7280" }}>View your application and message status</p>
            </div>

            <div style={{
              backgroundColor: "white",
              borderRadius: "16px",
              padding: "32px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              border: "1px solid #e5e7eb",
            }}>
              {/* Career Form Status */}
              <div style={{ marginBottom: "30px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                  <h3 style={{ fontSize: "18px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" }}>
                    <FiBriefcase /> Career Form Status
                  </h3>
                  <span style={{ 
                    padding: "6px 16px", 
                    borderRadius: "20px", 
                    fontWeight: "600", 
                    fontSize: "14px",
                    ...getBadgeStyle(careerStatus)
                  }}>
                    {getStatusText(careerStatus)}
                  </span>
                </div>
                
                <div style={{ 
                  backgroundColor: "#f9fafb", 
                  padding: "20px", 
                  borderRadius: "10px",
                  border: "1px solid #e5e7eb"
                }}>
                  <div style={{ fontSize: "14px", color: "#6b7280" }}>
                    Your career application status is displayed above. We will notify you once there's an update.
                  </div>
                </div>
              </div>

              {/* Contact Messages Status */}
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                  <h3 style={{ fontSize: "18px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" }}>
                    <FiMessageSquare /> Contact Messages Status
                  </h3>
                  <span style={{ 
                    padding: "6px 16px", 
                    borderRadius: "20px", 
                    fontWeight: "600", 
                    fontSize: "14px",
                    ...getBadgeStyle(contactStatus)
                  }}>
                    {getStatusText(contactStatus)}
                  </span>
                </div>
                
                <div style={{ 
                  backgroundColor: "#f9fafb", 
                  padding: "20px", 
                  borderRadius: "10px",
                  border: "1px solid #e5e7eb"
                }}>
                  <div style={{ fontSize: "14px", color: "#6b7280" }}>
                    Your contact messages status is displayed above. Check back for updates.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}