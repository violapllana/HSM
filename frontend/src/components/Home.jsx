import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";


const departments = [
  { name: "Emergency Department", icon: "/images/emergency-img.png" },
  { name: "Pediatric Department", icon: "/images/pediatrics-img.png" },
  { name: "Obstetrics and Gynaecology", icon: "/images/gynecology-img.png" },
  { name: "Cardiology Department", icon: "/images/cardiology-img.png" },
  { name: "Neurology Department", icon: "/images/neurology-img.png" },
  { name: "Psychiatry Department", icon: "/images/pyschiatry-img.png" },
];

const doctors = [
  { name: "Dr. Albert", position: "Cardiologist", image: "/images/albert.png" },
  { name: "Dr. Suela", position: "Pediatrician", image: "/images/suela-img.png" },
  { name: "Dr. Joni", position: "Neuro Specialist", image: "/images/joni-img.png" },
];
const Home = () => {
 

  return (
    <>
      <Header />

      {/* Hero Section */}
     
      <section className="bg-gradient-to-r from-sky-200 to-blue-300 text-blue-900 px-4 py-20 relative">


        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4">Your Partner in Health and Wellness</h1>
            <p className="mb-6 text-lg max-w-md">
              We are committed to providing you with the best medical and healthcare services to help you live healthier and happier
            </p>
            <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold shadow hover:bg-gray-100">
              BOOK AN APPOINTMENT
            </button>
          </div>
          <img src="/images/doctor_home1.png" alt="Doctors" className="w-80 mt-10 md:mt-0" />
        </div>
      </section>


      {/* Values Section */}
      <section className="relative py-6 bg-gray-50"> {/* Reduced padding */}
  <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">Our Values</h2> {/* Reduced margin-bottom */}

  <div className="relative w-[700px] h-[450px] mx-auto"> {/* Reduced width and height */}
    {/* Center Shield */}
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
      <img src="/images/healthh.png" alt="Health Shield" className="w-24 h-24" /> {/* Reduced shield size */}
    </div>
{/* Excellence - Top Center */}
<div className="absolute top-0 left-1/2 transform -translate-x-1/2">
  <div className="w-56 bg-white rounded-xl shadow-md hover:shadow-lg transition text-center border"> {/* Njësoj si të tjerat */}
    <div className="flex justify-center items-center px-3 py-2 bg-blue-100 rounded-t-xl"> {/* Ndryshuar nga bg-blue-500 në bg-blue-100 */}
      <div className="relative w-6 h-6 mr-1">
        <img src="/images/elipse.png" alt="Ellipse" className="w-6 h-6" />
        <img src="/images/Vector.png" alt="Vector" className="absolute inset-0 m-auto w-3 h-3" />
      </div>
      <h3 className="font-bold text-sm text-blue-900">Excellence</h3> {/* Shto tekstin blu */}
    </div>
    <p className="p-3 text-sm text-gray-700">
      We are committed to providing excellent care and services to our patients
    </p>
  </div>
</div>

    {/* Respect - Top Left */}
    <div className="absolute top-[120px] left-[0px]"> {/* Reduced top position */}
      <div className="w-56 bg-white rounded-xl shadow-md hover:shadow-lg transition text-center border"> {/* Reduced card width */}
        <div className="flex justify-center items-center px-3 py-2 bg-blue-100 rounded-t-xl">
          <img src="/images/respect-icon.png" alt="Respect" className="w-4 h-4 mr-1" />
          <h3 className="font-bold text-sm text-blue-900">Respect</h3>
        </div>
        <p className="p-3 text-sm text-gray-700">
          We treat all individuals with respect and dignity. We believe that every person deserves to be treated with compassion and kindness.
        </p>
      </div>
    </div>

    {/* Teamwork - Top Right */}
    <div className="absolute top-[120px] right-[0px]"> {/* Reduced top position */}
      <div className="w-56 bg-white rounded-xl shadow-md hover:shadow-lg transition text-center border"> {/* Reduced card width */}
        <div className="flex justify-center items-center px-3 py-2 bg-blue-100 rounded-t-xl">
          <img src="/images/teamwork.png" alt="Teamwork" className="w-4 h-4 mr-1" />
          <h3 className="font-bold text-sm text-blue-900">Teamwork</h3>
        </div>
        <p className="p-3 text-sm text-gray-700">
          We believe in working collaboratively with our team members and other healthcare providers to provide effective care to our patients.
        </p>
      </div>
    </div>

    {/* Compassion - Bottom Left */}
    <div className="absolute bottom-[30px] left-[130px]">
  <div className="w-56 bg-white rounded-xl shadow-md hover:shadow-lg transition text-center border">

        <div className="flex justify-center items-center px-3 py-2 bg-blue-100 rounded-t-xl">
          <img src="/images/compassion.png" alt="Compassion" className="w-4 h-4 mr-1" />
          <h3 className="font-bold text-sm text-blue-900">Compassion</h3>
        </div>
        <p className="p-3 text-sm text-gray-700">
          We strive to create a welcoming and supportive environment that puts our patients at ease.
        </p>
      </div>
    </div>

    {/* Integrity - Bottom Right */}
    <div className="absolute bottom-[10px] right-[80px]">{/* Reduced bottom position */}
      <div className="w-56 bg-white rounded-xl shadow-md hover:shadow-lg transition text-center border"> {/* Reduced card width */}
        <div className="flex justify-center items-center px-3 py-2 bg-blue-100 rounded-t-xl">
          <img src="/images/integrity.png" alt="Integrity" className="w-4 h-4 mr-1" />
          <h3 className="font-bold text-sm text-blue-900">Integrity</h3>
        </div>
        <p className="p-3 text-sm text-gray-700">
          We believe in practicing medicine with integrity and honesty. We always put our patient interest first.
        </p>
      </div>
    </div>
  </div>
</section>


      {/* Departments */}
      <section className="py-12 bg-white">
        <h2 className="text-3xl font-bold text-center mb-10">Departments</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto px-4">
          {departments.map((dept) => (
            <div
              key={dept.name}
              className="bg-white shadow-md rounded-lg p-4 text-center hover:shadow-lg transition"
            >
              <img src={dept.icon} alt="icon" className="mx-auto h-12 mb-2" />
              <p className="font-medium">{dept.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Doctors */}
      <section className="py-12 bg-gradient-to-r from-blue-100 to-purple-100">
        <h2 className="text-3xl font-bold text-center mb-10">Our Dedicated Doctors Team</h2>
        <div className="flex justify-center gap-10 flex-wrap">
          {doctors.map(({ name, position, image }) => (
            <div key={name} className="bg-white rounded-lg shadow-md p-4 text-center w-48 hover:shadow-lg transition">
              <img src={image} alt={name} className="rounded-full w-24 h-24 mx-auto mb-2 object-cover" />
              <p className="font-semibold">{name}</p>
              <p className="text-sm text-gray-500">{position}</p>
              <button className="mt-2 text-sm text-blue-500 underline">View Profile</button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white relative">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">Don’t Let Your Health Take a Backseat!</h2>
            <p className="mb-4">Schedule an appointment with one of our experienced medical professionals today!</p>
            <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100">Book Now</button>
          </div>
          <img src="/images/Ellipse13.png" alt="Doctor" className="w-40 mt-6 md:mt-0 md:w-52 rounded-full" />
        </div>
      </section>

{/* Testimonials Section */}
<section className="py-12 bg-gray-50">
  <div className="max-w-6xl mx-auto px-4 text-center">
    <h2 className="text-3xl font-bold text-blue-900 mb-8">What Our Patients Say</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-gray-700 italic mb-4">
          “The staff were incredibly professional and kind. I felt truly cared for during my visit.”
        </p>
        <p className="font-semibold text-blue-800">- Arben M.</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-gray-700 italic mb-4">
          “Great experience! Dr. Suela was amazing with my daughter. Highly recommended!”
        </p>
        <p className="font-semibold text-blue-800">- Elira D.</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-gray-700 italic mb-4">
          “I had a thorough check-up with no rush. The environment was clean and comforting.”
        </p>
        <p className="font-semibold text-blue-800">- Mentor K.</p>
      </div>
    </div>
  </div>
</section>
{/* FAQ Section */}
<section className="py-12 bg-white">
  <div className="max-w-5xl mx-auto px-4">
    <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">Frequently Asked Questions</h2>
    <div className="space-y-6">
      <div className="border border-gray-200 rounded-md p-4 hover:shadow-md transition">
        <h3 className="font-semibold text-lg text-blue-700 mb-2">How do I book an appointment?</h3>
        <p className="text-gray-700 text-sm">
          You can book an appointment online through our form or call our reception for assistance.
        </p>
      </div>
      <div className="border border-gray-200 rounded-md p-4 hover:shadow-md transition">
        <h3 className="font-semibold text-lg text-blue-700 mb-2">Do you accept insurance?</h3>
        <p className="text-gray-700 text-sm">
          Yes, we accept a variety of insurance plans. Please contact us to confirm if your provider is included.
        </p>
      </div>
      <div className="border border-gray-200 rounded-md p-4 hover:shadow-md transition">
        <h3 className="font-semibold text-lg text-blue-700 mb-2">What are your opening hours?</h3>
        <p className="text-gray-700 text-sm">
          We are open Monday to Saturday from 8:00 AM to 6:00 PM.
        </p>
      </div>
    </div>
  </div>
</section>


      <Footer />
    </>
  );
};

export default Home;
