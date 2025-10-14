// ===== USERS TABLE =====
const users = [
  {
    userId: 1,
    fullname: "Rahul Sharma",
    email: "rahul123@gmail.com",
    contact: "9876543210",
    password: "hashedPassword123",
    role: "Patient",
    gender: "male",
    isActive: true
  },
  {
    userId: 2,
    fullname: "Dr. Priya Mehta",
    email: "priya.mehta@gmail.com",
    contact: "9123456780",
    password: "hashedPassword456",
    role: "Doctor",
    gender: "female",
    isActive: true
  },
  {
    userId: 3,
    fullname: "Dr. Arjun Verma",
    email: "arjun.verma@gmail.com",
    contact: "9988776655",
    password: "hashedPassword789",
    role: "Doctor",
    gender: "male",
    isActive: true
  },
  {
    userId: 4,
    fullname: "Pikachu",
    email: "pikachu@gmail.com",
    contact: "9001122334",
    password: "hashedPassword999",
    role: "Admin",
    gender: "other",
    isActive: true
  }
];


// ===== PATIENT TABLE =====
const patients = [
    {
        patientId: 1,
        userId: 1,
        name: "Rahul Sharma",
        gender: "Male",
        age: 28,
        contact: "9876543210",
        email: "rahul@example.com",
        address: "Delhi, India",
        bloodGroup: "B+",
        medicalHistory: ["Diabetes", "Hypertension"],
        allergies: ["Penicillin"],
        emergencyContact: {
            name: "Suresh Sharma",
            relation: "Father",
            phone: "9811122233"
        }
    },
    
];

// ===== DOCTOR TABLE =====
const doctors = [
    {
        doctorId: 1,
        userId: 2,
        name: "Dr. Priya Mehta",
        gender: "Female",
        specialization: "Cardiologist",
        qualification: "MBBS, MD (Cardiology)",
        experience: 10,
        contact: "9123456789",
        email: "priya.mehta@example.com",
        hospitalAssignedBy: "Admin001",
        availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        availableTime: "10:00 AM - 4:00 PM",
        consultationFee: 700,
        profilePhoto: "https://example.com/doctors/priya.jpg",
        description:
            "Dr. Priya Mehta is a senior cardiologist with over 10 years of experience specializing in heart diseases, ECG analysis, and preventive care."
    },
    {
        doctorId: 2,
        userId: 3,
        name: "Dr. Arjun Verma",
        gender: "Male",
        specialization: "Orthopedic Surgeon",
        qualification: "MBBS, MS (Ortho)",
        experience: 8,
        contact: "9876001112",
        email: "arjun.verma@example.com",
        hospitalAssignedBy: "Admin001",
        availableDays: ["Tue", "Wed", "Fri", "Sat"],
        availableTime: "9:00 AM - 3:00 PM",
        consultationFee: 600,
        profilePhoto: "https://example.com/doctors/arjun.jpg",
        description:
            "Dr. Arjun Verma is an experienced orthopedic surgeon specializing in bone fractures, joint pain, and physiotherapy guidance."
    }
];

// ===== ADMIN TABLE =====
const admins = [
    {
        adminId: 1,
        userId: 4,
        name: "Rohit Verma",
        gender: "Male",
        email: "rohit.admin@example.com",
        contact: "9988776655",
        department: "Hospital Management"
    }
];

// ===== APPOINTMENT TABLE =====
const appointments = [
    {
        appointmentId: 101,
        patientId: 1,
        doctorId: 1,
        date: "2025-10-20",
        time: "10:30 AM",
        status: "Pending",
        mode: "Offline", // or Online
        symptoms: "Chest pain and shortness of breath"
    },
    {
        appointmentId: 102,
        patientId: 1,
        doctorId: 2,
        date: "2025-10-25",
        time: "12:00 PM",
        status: "Approved",
        mode: "Online",
        symptoms: "Knee pain after running"
    }
];


export { appointments, users, patients, doctors, admins };