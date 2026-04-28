const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Doctor = require('./models/Doctor');

dotenv.config();

const mongoUri = process.env.MONGODB_URI;

const doctors = [
  {
    user: new mongoose.Types.ObjectId(),
    name: 'Dr. Emily Carter',
    specialty: 'Cardiology',
    experience: 14,
    fee: 160,
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    about: 'Board-certified cardiologist with expertise in preventive care, heart disease management, and advanced imaging.',
    available: true,
    degree: 'MD',
  },
  {
    user: new mongoose.Types.ObjectId(),
    name: 'Dr. Arjun Patel',
    specialty: 'Neurology',
    experience: 12,
    fee: 190,
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    about: 'Experienced neurologist focused on migraine treatment, epilepsy care, and neurodegenerative disorders.',
    available: false,
    degree: 'MD, PhD',
  },
  {
    user: new mongoose.Types.ObjectId(),
    name: 'Dr. Maria Rodriguez',
    specialty: 'Pediatrics',
    experience: 10,
    fee: 130,
    image: 'https://randomuser.me/api/portraits/women/67.jpg',
    about: 'Compassionate pediatrician offering preventive care, immunizations, and child development support.',
    available: true,
    degree: 'MBBS',
  },
  {
    user: new mongoose.Types.ObjectId(),
    name: 'Dr. Sunita Sharma',
    specialty: 'Dermatology',
    experience: 9,
    fee: 145,
    image: 'https://randomuser.me/api/portraits/women/23.jpg',
    about: 'Dermatologist specializing in acne, eczema, psoriasis, and skin cancer screening.',
    available: true,
    degree: 'MD',
  },
  {
    user: new mongoose.Types.ObjectId(),
    name: 'Dr. James Kim',
    specialty: 'Orthopedics',
    experience: 16,
    fee: 220,
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
    about: 'Expert orthopedic surgeon with a focus on sports injuries, joint preservation, and minimally invasive care.',
    available: false,
    degree: 'MBBS, MS',
  },
  {
    user: new mongoose.Types.ObjectId(),
    name: 'Dr. Anjali Mehta',
    specialty: 'ENT',
    experience: 11,
    fee: 140,
    image: 'https://randomuser.me/api/portraits/women/89.jpg',
    about: 'ENT specialist providing care for sinus disorders, hearing loss, and voice disorders with personalized treatment plans.',
    available: true,
    degree: 'MBBS, DLO',
  },
  {
    user: new mongoose.Types.ObjectId(),
    name: 'Dr. Sofia Williams',
    specialty: 'General Practice',
    experience: 8,
    fee: 110,
    image: 'https://randomuser.me/api/portraits/women/12.jpg',
    about: 'Primary care physician delivering preventive health screenings, chronic disease management, and wellness coaching.',
    available: true,
    degree: 'MD',
  },
  {
    user: new mongoose.Types.ObjectId(),
    name: 'Dr. Nikhil Verma',
    specialty: 'Ophthalmology',
    experience: 13,
    fee: 170,
    image: 'https://randomuser.me/api/portraits/men/78.jpg',
    about: 'Ophthalmologist experienced in cataract care, glaucoma management, and comprehensive eye exams.',
    available: false,
    degree: 'MD',
  },
  {
    user: new mongoose.Types.ObjectId(),
    name: 'Dr. Robert Johnson',
    specialty: 'Cardiology',
    experience: 18,
    fee: 250,
    image: 'https://randomuser.me/api/portraits/men/56.jpg',
    about: 'Senior cardiologist specializing in interventional cardiology, heart failure treatment, and cardiac rehabilitation.',
    available: true,
    degree: 'MD, FACC',
  },
  {
    user: new mongoose.Types.ObjectId(),
    name: 'Dr. Lisa Chen',
    specialty: 'Neurology',
    experience: 15,
    fee: 200,
    image: 'https://randomuser.me/api/portraits/women/34.jpg',
    about: 'Neurologist with expertise in stroke care, multiple sclerosis, and movement disorders.',
    available: true,
    degree: 'MD, PhD',
  },
];

const seedDoctors = async () => {
  try {
    console.log("🔥 CONNECTING TO:", mongoUri);

    await mongoose.connect(mongoUri);

    console.log("🧹 DELETING OLD DATA...");
    await Doctor.deleteMany({});

    console.log("📥 INSERTING NEW DATA...");
    await Doctor.insertMany(doctors);

    const count = await Doctor.countDocuments();
    console.log("✅ TOTAL DOCTORS NOW:", count);

    console.log("🎉 DONE!");
    process.exit(0);
  } catch (error) {
    console.error("❌ ERROR:", error);
    process.exit(1);
  }
};

seedDoctors();