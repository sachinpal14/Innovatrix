import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Stethoscope, Pill, Calendar, MapPin, Star, Clock, X, Check } from 'lucide-react';
import { medicinesData } from '../../../utils/medicinedemo';
import { doctorsShowcase as doctors } from '../../../utils/demo';
import MedicineOrderForm from '../../medicines/components/medicine-order-form';


const SymptomChecker = () => {
    const [symptoms, setSymptoms] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [appointmentBooked, setAppointmentBooked] = useState(false);

    //   // Demo doctors data
    //   const doctors = [
    //     {
    //       id: 1,
    //       name: "Dr. Sarah Johnson",
    //       specialty: "General Physician",
    //       rating: 4.8,
    //       experience: "15 years",
    //       location: "Medical Center, Downtown",
    //       availability: "Available Today",
    //       image: "👩‍⚕️"
    //     },
    //     {
    //       id: 2,
    //       name: "Dr. Michael Chen",
    //       specialty: "Internal Medicine",
    //       rating: 4.9,
    //       experience: "12 years",
    //       location: "City Hospital",
    //       availability: "Available Tomorrow",
    //       image: "👨‍⚕️"
    //     },
    //     {
    //       id: 3,
    //       name: "Dr. Emily Rodriguez",
    //       specialty: "Family Medicine",
    //       rating: 4.7,
    //       experience: "10 years",
    //       location: "Community Clinic",
    //       availability: "Available Today",
    //       image: "👩‍⚕️"
    //     }
    //   ];

    // Your medicine array - using demo data structure you can replace
    //   const medicines = [
    //     {
    //       id: 1,
    //       name: "Paracetamol",
    //       dosage: "500mg",
    //       frequency: "3 times daily",
    //       description: "Pain reliever and fever reducer",
    //       price: "$5.99"
    //     },
    //     {
    //       id: 2,
    //       name: "Ibuprofen",
    //       dosage: "400mg",
    //       frequency: "2 times daily",
    //       description: "Anti-inflammatory medication",
    //       price: "$7.99"
    //     },
    //     {
    //       id: 3,
    //       name: "Amoxicillin",
    //       dosage: "250mg",
    //       frequency: "3 times daily",
    //       description: "Antibiotic for bacterial infections",
    //       price: "$12.99"
    //     }
    //   ];

    // Disease possibilities based on symptoms
    const diseasePossibilities = [
        {
            name: "Common Cold",
            probability: 75,
            symptoms: ["runny nose", "cough", "sore throat"],
            severity: "Mild"
        },
        {
            name: "Seasonal Flu",
            probability: 60,
            symptoms: ["fever", "body ache", "fatigue"],
            severity: "Moderate"
        },
        {
            name: "Allergic Rhinitis",
            probability: 45,
            symptoms: ["sneezing", "itchy eyes", "congestion"],
            severity: "Mild"
        }
    ];






    const handleSearch = () => {
        if (!symptoms.trim()) return;

        // 1. Split the user input from symptoms state
        const symptomList = symptoms
            .toLowerCase()
            .split(",")           // split by comma
            .map(s => s.trim())   // remove spaces
            .filter(Boolean);     // remove empty strings

        // 2. Filter diseases (check if disease has any of the symptoms)
        const matchedDiseases = diseasePossibilities.filter(disease =>
            disease.symptoms.some(sym =>
                symptomList.includes(sym.toLowerCase())
            )
        );





        const matchedMedicines = medicinesData.filter(med =>
            // check disease list
            med.disease.some(des =>
                symptomList.some(sym => des.toLowerCase().includes(sym))
            ) ||
            // check usage text
            (med.usage &&
                symptomList.some(sym =>
                    med.usage.toLowerCase().includes(sym)
                )
            )

        );

        const matchedDoctors = doctors.filter(doc =>
            symptomList.some(sym => {
                const lowerSym = sym.toLowerCase();
                const symptomMatch = doc.symptoms.some(s => s.toLowerCase() === lowerSym);
                const nameMatch = doc.name.toLowerCase().includes(lowerSym);
                return symptomMatch || nameMatch;
            })
        );









        // 5. Set results
        setSearchResults({
            doctors: matchedDoctors,
            diseases: matchedDiseases,
            medicines: matchedMedicines
        });
    };





    const bookAppointment = (doctor) => {
        setSelectedDoctor(doctor);
    };

    const confirmAppointment = () => {
        setAppointmentBooked(true);
        setTimeout(() => {
            setSelectedDoctor(null);
            setAppointmentBooked(false);
        }, 2000);
    };

    const selectMedicine = (medicine) => {
        setSelectedMedicine(medicine);
    };

    const handleClose = () => {
        setSelectedMedicine(null)
    }


    

    return (
        <div className="min-h-screen bg-gradient-to-br  from-blue-50 via-white to-purple-50">
            <div className="container  mx-auto px-4 py-20 max-w-7xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        Symptoms Checker
                    </h1>
                    <p className="text-gray-600">
                        Describe your symptoms and get personalized recommendations
                    </p>
                </motion.div>

                {/* Search Box */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-8"
                >
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <label className="block text-gray-700 font-semibold mb-3">
                            What symptoms are you experiencing?
                        </label>
                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={symptoms}
                                onChange={(e) => setSymptoms(e.target.value)}
                                placeholder="E.g., fever, headache, cough..."
                                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleSearch}
                                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-blue-700 transition-colors"
                            >
                                <Search size={20} />
                                Search
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* Results Section */}
                <AnimatePresence>
                    {(searchResults && !selectedMedicine) && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid lg:grid-cols-2 gap-6"
                        >
                            {/* Left Side - Doctors */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white rounded-2xl shadow-lg p-6"
                            >
                                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <Stethoscope className="text-blue-600" />
                                    Recommended Doctors
                                </h2>
                                <div className="doctorsShowcase space-y-4 h-[450px] overflow-y-auto">
                                    {searchResults.doctors.map((doctor, index) => (
                                        <motion.div
                                            key={doctor.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="border-2 border-gray-100 rounded-xl p-4 hover:border-blue-300 transition-all cursor-pointer"
                                            onClick={() => bookAppointment(doctor)}
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="text-4xl">{doctor.image}</div>
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-gray-800 text-lg">
                                                        {doctor.name}
                                                    </h3>
                                                    <p className="text-blue-600 text-sm mb-2">
                                                        {doctor.specialty}
                                                    </p>
                                                    <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                                                        <span className="flex items-center gap-1">
                                                            <Star size={16} className="text-yellow-500" />
                                                            {doctor.rating}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Clock size={16} />
                                                            {doctor.experience}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <MapPin size={16} />
                                                            {doctor.location}
                                                        </span>
                                                    </div>
                                                    <div className="mt-2">
                                                        <span className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                                                            {doctor.availability}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}

                                    {searchResults.doctors.length === 0 && (
                                        <div className=" text-gray-500 mt-52 text-center text-2xl capitalize">
                                            No doctors found for the given symptoms...! 
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                          


                            {/* Right Side - Diseases & Medicines */}

                            {/* Medicines */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-white rounded-2xl shadow-lg p-6 h-[550px] overflow-y-auto"
                            >
                                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <Pill className="text-purple-600" />
                                    Recommended Medicines
                                </h2>
                                <div className="space-y-3">
                                    {searchResults.medicines.map((medicine, index) => (
                                        <motion.div
                                            key={medicine.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="border-2 border-gray-100 rounded-xl p-4 hover:border-purple-300 transition-all cursor-pointer"
                                            onClick={() => selectMedicine(medicine)}
                                        >
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-gray-800">
                                                        {medicine.name}
                                                    </h3>
                                                    {/* <p className="text-sm text-gray-600 mb-1">
                              {medicine.description}
                            </p> */}
                                                    {/* <div className="flex gap-3 text-xs text-gray-500">
                              <span>Dosage: {medicine.dosage}</span>
                              <span>•</span>
                              <span>{medicine.frequency}</span>
                            </div> */}


                                                </div>
                                                <span className="font-bold text-purple-600">
                                                    $:{medicine.price}
                                                </span>
                                            </div>
                                        </motion.div>
                                    ))}

                                     {searchResults.medicines.length === 0 && (
                                        <div className=" text-gray-500 mt-52 text-center text-2xl capitalize">
                                            No Medicine found for the given symptoms...!
                                        </div>
                                    )}
                                </div>
                            </motion.div>



                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Doctor Appointment Modal */}
                <AnimatePresence>
                    {(selectedDoctor && !selectedMedicine) && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                            onClick={() => setSelectedDoctor(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 20 }}
                                className="bg-white rounded-2xl p-6 max-w-md w-full"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {!appointmentBooked ? (
                                    <>
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-2xl font-bold text-gray-800">
                                                Book Appointment
                                            </h3>
                                            <button
                                                onClick={() => setSelectedDoctor(null)}
                                                className="text-gray-400 hover:text-gray-600"
                                            >
                                                <X size={24} />
                                            </button>
                                        </div>
                                        <div className="text-center mb-6">
                                            <div className="text-6xl mb-2">{selectedDoctor.image}</div>
                                            <h4 className="text-xl font-bold text-gray-800">
                                                {selectedDoctor.name}
                                            </h4>
                                            <p className="text-blue-600">{selectedDoctor.specialty}</p>
                                        </div>
                                        <div className="space-y-3 mb-6">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Calendar size={20} />
                                                <span>Select your preferred date and time</span>
                                            </div>
                                            <input
                                                type="date"
                                                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                                            />
                                            <input
                                                type="time"
                                                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                                            />
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={confirmAppointment}
                                            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                                        >
                                            Confirm Appointment
                                        </motion.button>
                                    </>
                                ) : (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="text-center py-8"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.2 }}
                                            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                                        >
                                            <Check size={40} className="text-green-600" />
                                        </motion.div>
                                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                            Appointment Booked!
                                        </h3>
                                        <p className="text-gray-600">
                                            You will receive a confirmation email shortly
                                        </p>
                                    </motion.div>
                                )}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Medicine Details Modal */}
                <AnimatePresence>
                    {/* {selectedMedicine && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                            onClick={() => setSelectedMedicine(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 20 }}
                                className="bg-white rounded-2xl p-6 max-w-md w-full"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-2xl font-bold text-gray-800">
                                        Medicine Details
                                    </h3>
                                    <button
                                        onClick={() => setSelectedMedicine(null)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>
                                <div className="mb-6">
                                    <div className="bg-purple-50 rounded-xl p-4 mb-4">
                                        <h4 className="text-xl font-bold text-gray-800 mb-2">
                                            {selectedMedicine.name}
                                        </h4>
                                        <p className="text-gray-600 mb-3">
                                            {selectedMedicine.description}
                                        </p>
                                        <div className="grid grid-cols-2 gap-3 text-sm">
                                            <div>
                                                <span className="text-gray-500">Dosage:</span>
                                                <p className="font-semibold text-gray-800">
                                                    {selectedMedicine.dosage}
                                                </p>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">Frequency:</span>
                                                <p className="font-semibold text-gray-800">
                                                    {selectedMedicine.frequency}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-2xl font-bold text-purple-600">
                                            {selectedMedicine.price}
                                        </span>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                                        >
                                            Order Now
                                        </motion.button>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 text-center">
                                    ⚠️ Always consult with a healthcare professional before taking any medication
                                </p>
                            </motion.div>
                        </motion.div>
                    )} */}
                </AnimatePresence>

                {
                    selectedMedicine && <MedicineOrderForm medicine={selectedMedicine} onClose={handleClose} />
                }
            </div>
        </div>
    );
};

export default SymptomChecker;