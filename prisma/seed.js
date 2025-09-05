// prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Doctors
  const doc1 = await prisma.doctor.create({
    data: { name: "Dr. John Smith", specialization: "Cardiology" },
  });
  const doc2 = await prisma.doctor.create({
    data: { name: "Dr. Emily Johnson", specialization: "Neurology" },
  });

  // Patients
  const pat1 = await prisma.patient.create({ data: { name: "Alice Brown" } });
  const pat2 = await prisma.patient.create({ data: { name: "Michael Green" } });

  // Appointments
  await prisma.appointment.createMany({
    data: [
      {
        date: new Date(),
        status: "Scheduled",
        mode: "Online",
        doctorId: doc1.id,
        patientId: pat1.id,
      },
      {
        date: new Date(),
        status: "Completed",
        mode: "Offline",
        doctorId: doc2.id,
        patientId: pat2.id,
      },
    ],
  });

  // Transactions
  await prisma.transaction.createMany({
    data: [
      { title: "Consultation Fee", amount: 200 },
      { title: "Follow-up Fee", amount: 150 },
    ],
  });

  console.log("✅ Database has been seeded!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
