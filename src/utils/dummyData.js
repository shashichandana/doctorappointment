/**
 * Dummy Doctor Data for PulsePoint Application
 */

export const specialties = [
  {
    id: 1,
    name: 'General Physician',
    icon: '👨‍⚕️',
    doctorCount: 12,
  },
  {
    id: 2,
    name: 'Gynecologist',
    icon: '👩‍⚕️',
    doctorCount: 8,
  },
  {
    id: 3,
    name: 'Dermatologist',
    icon: '🧴',
    doctorCount: 6,
  },
  {
    id: 4,
    name: 'Pediatrician',
    icon: '👶',
    doctorCount: 10,
  },
  {
    id: 5,
    name: 'Neurologist',
    icon: '🧠',
    doctorCount: 5,
  },
  {
    id: 6,
    name: 'Cardiologist',
    icon: '❤️',
    doctorCount: 7,
  },
];

export const doctors = [
  {
    id: 1,
    name: 'Dr. Sarah Anderson',
    specialty: 'General Physician',
    experience: 12,
    fee: 500,
    available: true,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    degree: 'MBBS, MD',
    about:
      'Dr. Sarah has 12 years of experience in general medicine. She is known for her compassionate care and thorough diagnosis.',
    rating: 4.8,
    reviews: 145,
  },
  {
    id: 2,
    name: 'Dr. Rajesh Kumar',
    specialty: 'Cardiologist',
    experience: 15,
    fee: 800,
    available: true,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    degree: 'MBBS, MD, DM',
    about:
      'Dr. Rajesh is a highly experienced cardiologist with expertise in preventive cardiology and interventional procedures.',
    rating: 4.9,
    reviews: 201,
  },
  {
    id: 3,
    name: 'Dr. Emily Watson',
    specialty: 'Gynecologist',
    experience: 10,
    fee: 600,
    available: false,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    degree: 'MBBS, MS',
    about:
      'Dr. Emily specializes in obstetrics and gynecology with a focus on women\'s health and wellness.',
    rating: 4.7,
    reviews: 98,
  },
  {
    id: 4,
    name: 'Dr. Michael Chen',
    specialty: 'Dermatologist',
    experience: 8,
    fee: 550,
    available: true,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    degree: 'MBBS, MD',
    about:
      'Dr. Michael is a skilled dermatologist specializing in acne treatment, laser therapy, and cosmetic dermatology.',
    rating: 4.6,
    reviews: 112,
  },
  {
    id: 5,
    name: 'Dr. Priya Sharma',
    specialty: 'Pediatrician',
    experience: 9,
    fee: 450,
    available: true,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    degree: 'MBBS, MD',
    about:
      'Dr. Priya has a warm approach to pediatric care, specializing in child immunization and developmental health.',
    rating: 4.8,
    reviews: 156,
  },
  {
    id: 6,
    name: 'Dr. David Mitchell',
    specialty: 'Neurologist',
    experience: 14,
    fee: 700,
    available: true,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    degree: 'MBBS, MD, DM',
    about:
      'Dr. David is an experienced neurologist with expertise in migraine management and neurological disorders.',
    rating: 4.7,
    reviews: 134,
  },
  {
    id: 7,
    name: 'Dr. Jessica Lee',
    specialty: 'General Physician',
    experience: 7,
    fee: 450,
    available: false,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    degree: 'MBBS',
    about:
      'Dr. Jessica is a compassionate general physician dedicated to holistic patient care and preventive medicine.',
    rating: 4.5,
    reviews: 89,
  },
  {
    id: 8,
    name: 'Dr. Arjun Singh',
    specialty: 'General Physician',
    experience: 11,
    fee: 500,
    available: true,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    degree: 'MBBS, MD',
    about:
      'Dr. Arjun brings clinical expertise and empathy to his practice, focusing on patient education.',
    rating: 4.6,
    reviews: 121,
  },
  {
    id: 9,
    name: 'Dr. Sophia Rodriguez',
    specialty: 'Gynecologist',
    experience: 13,
    fee: 650,
    available: true,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    degree: 'MBBS, MS, Fellow',
    about:
      'Dr. Sophia is a renowned gynecologist with special interest in fertility and women\'s reproductive health.',
    rating: 4.9,
    reviews: 178,
  },
  {
    id: 10,
    name: 'Dr. Thomas Brown',
    specialty: 'Cardiologist',
    experience: 16,
    fee: 850,
    available: true,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    degree: 'MBBS, MD, DM, Fellow',
    about:
      'Dr. Thomas is a senior cardiologist with expertise in complex cardiac cases and interventional cardiology.',
    rating: 5.0,
    reviews: 267,
  },
];

/**
 * Get doctor by ID
 */
export const getDoctorById = (id) => {
  return doctors.find((doc) => doc.id === parseInt(id));
};

/**
 * Get doctors by specialty
 */
export const getDoctorsBySpecialty = (specialty) => {
  return doctors.filter(
    (doc) => doc.specialty.toLowerCase() === specialty.toLowerCase()
  );
};

/**
 * Get available doctors
 */
export const getAvailableDoctors = () => {
  return doctors.filter((doc) => doc.available);
};

/**
 * Time slots for appointments (in 24-hour format)
 */
export const timeSlots = [
  '09:00 AM',
  '09:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '02:00 PM',
  '02:30 PM',
  '03:00 PM',
  '03:30 PM',
  '04:00 PM',
  '04:30 PM',
];
