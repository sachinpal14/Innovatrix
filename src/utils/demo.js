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
]

const doctorsShowcase = [
  { id: 1, name: "Dr. Sarah Johnson", specialty: "General Physician", rating: 4.8, experience: "15 years", location: "Medical Center, Downtown", availability: "Available Today", image: "👩‍⚕️", symptoms: ["Fever", "Cough", "Headache", "Fatigue"] },
  { id: 2, name: "Dr. Michael Chen", specialty: "Internal Medicine", rating: 4.9, experience: "12 years", location: "City Hospital", availability: "Available Tomorrow", image: "👨‍⚕️", symptoms: ["Diabetes", "Hypertension", "Cholesterol Issues"] },
  { id: 3, name: "Dr. Emily Rodriguez", specialty: "Family Medicine", rating: 4.7, experience: "10 years", location: "Community Clinic", availability: "Available Today", image: "👩‍⚕️", symptoms: ["Cold", "Flu", "Allergies", "Minor Infections"] },
  { id: 4, name: "Dr. James Carter", specialty: "Dermatology", rating: 4.6, experience: "9 years", location: "Skin Care Center", availability: "Available Today", image: "👨‍⚕️", symptoms: ["Acne", "Eczema", "Psoriasis", "Rashes"] },
  { id: 5, name: "Dr. Olivia Martinez", specialty: "Pediatrics", rating: 4.9, experience: "14 years", location: "Children’s Hospital", availability: "Available Tomorrow", image: "👩‍⚕️", symptoms: ["Fever", "Cough", "Ear Infection", "Growth Concerns"] },
  { id: 6, name: "Dr. Robert Wilson", specialty: "Cardiology", rating: 4.8, experience: "18 years", location: "Heart Institute", availability: "Available Today", image: "👨‍⚕️", symptoms: ["Chest Pain", "Palpitations", "Shortness of Breath"] },
  { id: 7, name: "Dr. Aisha Khan", specialty: "Neurology", rating: 4.7, experience: "11 years", location: "City Neuro Center", availability: "Available Tomorrow", image: "👩‍⚕️", symptoms: ["Headache", "Seizures", "Memory Issues", "Dizziness"] },
  { id: 8, name: "Dr. Daniel Parker", specialty: "Orthopedics", rating: 4.5, experience: "16 years", location: "Ortho Clinic", availability: "Available Today", image: "👨‍⚕️", symptoms: ["Back Pain", "Fractures", "Joint Pain", "Sports Injuries"] },
  { id: 9, name: "Dr. Priya Mehta", specialty: "Gynecology", rating: 4.9, experience: "13 years", location: "Women's Care", availability: "Available Tomorrow", image: "👩‍⚕️", symptoms: ["Menstrual Disorders", "Pregnancy Checkup", "PCOS", "Fertility Issues"] },
  { id: 10, name: "Dr. Ethan Walker", specialty: "Urology", rating: 4.6, experience: "12 years", location: "City Uro Clinic", availability: "Available Today", image: "👨‍⚕️", symptoms: ["Kidney Stones", "Urinary Tract Infection", "Prostate Issues"] },

  { id: 11, name: "Dr. Sophia Green", specialty: "General Physician", rating: 4.8, experience: "7 years", location: "Community Clinic", availability: "Available Today", image: "👩‍⚕️", symptoms: ["Fever", "Cough", "Cold", "Fatigue"] },
  { id: 12, name: "Dr. Liam Thompson", specialty: "Internal Medicine", rating: 4.7, experience: "9 years", location: "City Hospital", availability: "Available Tomorrow", image: "👨‍⚕️", symptoms: ["Hypertension", "Diabetes", "Thyroid Issues"] },
  { id: 13, name: "Dr. Isabella Flores", specialty: "Dermatology", rating: 4.6, experience: "8 years", location: "Skin Health Center", availability: "Available Today", image: "👩‍⚕️", symptoms: ["Rashes", "Acne", "Skin Infections"] },
  { id: 14, name: "Dr. Noah Patel", specialty: "Cardiology", rating: 4.8, experience: "17 years", location: "Heart Care Institute", availability: "Available Tomorrow", image: "👨‍⚕️", symptoms: ["Heart Palpitations", "High Blood Pressure", "Chest Pain"] },
  { id: 15, name: "Dr. Ava Mitchell", specialty: "Pediatrics", rating: 4.9, experience: "12 years", location: "Kids Medical Center", availability: "Available Today", image: "👩‍⚕️", symptoms: ["Cold", "Fever", "Vaccinations"] },
  { id: 16, name: "Dr. William Anderson", specialty: "Neurology", rating: 4.7, experience: "13 years", location: "Brain & Spine Center", availability: "Available Today", image: "👨‍⚕️", symptoms: ["Migraines", "Seizures", "Stroke Risk"] },
  { id: 17, name: "Dr. Mia Garcia", specialty: "General Physician", rating: 4.5, experience: "6 years", location: "Medical Center Downtown", availability: "Available Tomorrow", image: "👩‍⚕️", symptoms: ["Flu", "Cough", "Body Pain"] },
  { id: 18, name: "Dr. Benjamin Scott", specialty: "Orthopedics", rating: 4.6, experience: "15 years", location: "Ortho & Joint Clinic", availability: "Available Today", image: "👨‍⚕️", symptoms: ["Knee Pain", "Shoulder Injuries", "Fractures"] },
  { id: 19, name: "Dr. Charlotte Lewis", specialty: "Gynecology", rating: 4.8, experience: "14 years", location: "Women's Health Clinic", availability: "Available Today", image: "👩‍⚕️", symptoms: ["Pregnancy Care", "Menstrual Issues", "Fertility"] },
  { id: 20, name: "Dr. Henry Collins", specialty: "Urology", rating: 4.5, experience: "10 years", location: "Uro Specialty Center", availability: "Available Tomorrow", image: "👨‍⚕️", symptoms: ["Urinary Tract Infection", "Kidney Stones", "Prostate Health"] },

  { id: 21, name: "Dr. Harper Rivera", specialty: "Family Medicine", rating: 4.7, experience: "11 years", location: "Primary Health Hub", availability: "Available Today", image: "👩‍⚕️", symptoms: ["Cold", "Fever", "Allergies"] },
  { id: 22, name: "Dr. Alexander Brooks", specialty: "Internal Medicine", rating: 4.8, experience: "12 years", location: "City Hospital", availability: "Available Tomorrow", image: "👨‍⚕️", symptoms: ["High Blood Pressure", "Diabetes", "Cholesterol"] },
  { id: 23, name: "Dr. Amelia Watson", specialty: "Pediatrics", rating: 4.9, experience: "10 years", location: "Children Wellness Clinic", availability: "Available Today", image: "👩‍⚕️", symptoms: ["Fever", "Cold", "Vaccinations"] },
  { id: 24, name: "Dr. Elijah Sanders", specialty: "Cardiology", rating: 4.7, experience: "19 years", location: "Heart Institute", availability: "Available Today", image: "👨‍⚕️", symptoms: ["Chest Pain", "Arrhythmia", "Heart Failure"] },
  { id: 25, name: "Dr. Abigail Bennett", specialty: "Dermatology", rating: 4.6, experience: "9 years", location: "Skin Clinic Pro", availability: "Available Tomorrow", image: "👩‍⚕️", symptoms: ["Acne", "Skin Allergies", "Rashes"] },

  { id: 26, name: "Dr. Jack Hughes", specialty: "Orthopedics", rating: 4.5, experience: "16 years", location: "Joint & Bone Center", availability: "Available Today", image: "👨‍⚕️", symptoms: ["Fractures", "Arthritis", "Sports Injuries"] },
  { id: 27, name: "Dr. Ella Foster", specialty: "General Physician", rating: 4.8, experience: "5 years", location: "Central Clinic", availability: "Available Today", image: "👩‍⚕️", symptoms: ["Cold", "Flu", "Headache"] },
  { id: 28, name: "Dr. Samuel Reed", specialty: "Neurology", rating: 4.7, experience: "14 years", location: "Neuro Specialist Center", availability: "Available Tomorrow", image: "👨‍⚕️", symptoms: ["Seizures", "Migraines", "Memory Loss"] },
  { id: 29, name: "Dr. Grace Morgan", specialty: "Gynecology", rating: 4.9, experience: "13 years", location: "Women Wellness Center", availability: "Available Today", image: "👩‍⚕️", symptoms: ["Pregnancy Care", "Menstrual Disorders", "Fertility Issues"] },
  { id: 30, name: "Dr. Logan Rivera", specialty: "Urology", rating: 4.6, experience: "11 years", location: "Uro Clinic Plus", availability: "Available Today", image: "👨‍⚕️", symptoms: ["Kidney Stones", "Urinary Infection", "Prostate Problems"] },

  { id: 31, name: "Dr. Chloe Turner", specialty: "Family Medicine", rating: 4.6, experience: "8 years", location: "Health Group Center", availability: "Available Tomorrow", image: "👩‍⚕️", symptoms: ["Cold", "Fever", "Allergies"] },
  { id: 32, name: "Dr. Luca West", specialty: "General Physician", rating: 4.7, experience: "6 years", location: "Community Health Care", availability: "Available Today", image: "👨‍⚕️", symptoms: ["Cough", "Fever", "Fatigue"] },
  { id: 33, name: "Dr. Zoe Ramirez", specialty: "Pediatrics", rating: 4.8, experience: "9 years", location: "Kids Clinic", availability: "Available Tomorrow", image: "👩‍⚕️", symptoms: ["Cold", "Fever", "Vaccinations"] },
  { id: 34, name: "Dr. Julian Scott", specialty: "Internal Medicine", rating: 4.7, experience: "10 years", location: "City Hospital", availability: "Available Today", image: "👨‍⚕️", symptoms: ["Diabetes", "Hypertension", "Thyroid"] },
  { id: 35, name: "Dr. Lily Adams", specialty: "Dermatology", rating: 4.6, experience: "11 years", location: "Skin Health Pro", availability: "Available Today", image: "👩‍⚕️", symptoms: ["Acne", "Eczema", "Rashes"] },

  { id: 36, name: "Dr. Gabriel King", specialty: "Cardiology", rating: 4.8, experience: "15 years", location: "Heart Specialists", availability: "Available Tomorrow", image: "👨‍⚕️", symptoms: ["Chest Pain", "Arrhythmia", "High Blood Pressure"] },
  { id: 37, name: "Dr. Victoria Reyes", specialty: "Neurology", rating: 4.7, experience: "12 years", location: "Neuro Care Hospital", availability: "Available Today", image: "👩‍⚕️", symptoms: ["Migraines", "Seizures", "Memory Problems"] },
  { id: 38, name: "Dr. Matthew Cooper", specialty: "Orthopedics", rating: 4.5, experience: "17 years", location: "Ortho Prime", availability: "Available Today", image: "👨‍⚕️", symptoms: ["Back Pain", "Fractures", "Joint Pain"] },
  { id: 39, name: "Dr. Scarlett Hughes", specialty: "Gynecology", rating: 4.8, experience: "10 years", location: "Women Clinic", availability: "Available Tomorrow", image: "👩‍⚕️", symptoms: ["Pregnancy Care", "PCOS", "Menstrual Disorders"] },
  { id: 40, name: "Dr. Isaac Stewart", specialty: "Urology", rating: 4.6, experience: "12 years", location: "Urology Specialist Center", availability: "Available Today", image: "👨‍⚕️", symptoms: ["Kidney Stones", "UTI", "Prostate Issues"] },

  { id: 41, name: "Dr. Natalie Bryant", specialty: "Family Medicine", rating: 4.7, experience: "9 years", location: "Family Care Hub", availability: "Available Today", image: "👩‍⚕️", symptoms: ["Cold", "Fever", "Allergies"] },
  { id: 42, name: "Dr. Jordan Phillips", specialty: "General Physician", rating: 4.8, experience: "7 years", location: "City Clinic", availability: "Available Tomorrow", image: "👨‍⚕️", symptoms: ["Cough", "Cold", "Flu"] },
  { id: 43, name: "Dr. Stella Wood", specialty: "Internal Medicine", rating: 4.9, experience: "14 years", location: "Specialist Hospital", availability: "Available Today", image: "👩‍⚕️", symptoms: ["Hypertension", "Diabetes", "Thyroid Issues"] },
  { id: 44, name: "Dr. Andrew Watson", specialty: "Dermatology", rating: 4.6, experience: "8 years", location: "Skin Plus Center", availability: "Available Today", image: "👨‍⚕️", symptoms: ["Acne", "Rashes", "Eczema"] },
  { id: 45, name: "Dr. Penelope Scott", specialty: "Cardiology", rating: 4.8, experience: "16 years", location: "Heart Institute", availability: "Available Tomorrow", image: "👩‍⚕️", symptoms: ["Chest Pain", "Arrhythmia", "Heart Disease"] },

  { id: 46, name: "Dr. Mason Torres", specialty: "Pediatrics", rating: 4.9, experience: "13 years", location: "Child Care Hospital", availability: "Available Today", image: "👨‍⚕️", symptoms: ["Fever", "Cold", "Vaccinations"] },
  { id: 47, name: "Dr. Layla Brooks", specialty: "Neurology", rating: 4.7, experience: "11 years", location: "Brain Clinic", availability: "Available Today", image: "👩‍⚕️", symptoms: ["Seizures", "Migraines", "Memory Loss"] },
  { id: 48, name: "Dr. Wyatt Gray", specialty: "Orthopedics", rating: 4.5, experience: "18 years", location: "Joint Care Clinic", availability: "Available Tomorrow", image: "👨‍⚕️", symptoms: ["Fractures", "Joint Pain", "Arthritis"] },
  { id: 49, name: "Dr. Hannah Price", specialty: "Gynecology", rating: 4.9, experience: "10 years", location: "Women’s Health Center", availability: "Available Today", image: "👩‍⚕️", symptoms: ["Pregnancy Care", "PCOS", "Menstrual Disorders"] },
  { id: 50, name: "Dr. Oliver Cox", specialty: "Urology", rating: 4.6, experience: "12 years", location: "Urology Prime", availability: "Available Tomorrow", image: "👨‍⚕️", symptoms: ["Kidney Stones", "UTI", "Prostate Health"] }
];



export { appointments, users, patients, doctors, admins, doctorsShowcase };