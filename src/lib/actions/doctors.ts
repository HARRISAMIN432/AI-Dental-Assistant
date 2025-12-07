"use server";
import { Gender } from "@/generated/enums";
import { prisma } from "../prisma";
import { generateAvatar } from "../utils";
import { revalidatePath } from "next/cache";

export type DoctorWithAppointmentCount = Awaited<
  ReturnType<typeof getDoctorsRaw>
>[number] & {
  appointmentCount: number;
};

async function getDoctorsRaw() {
  return prisma.doctor.findMany({
    include: {
      _count: { select: { appointments: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getDoctors(): Promise<DoctorWithAppointmentCount[]> {
  const doctors = await getDoctorsRaw();

  return doctors.map((doctor) => ({
    ...doctor,
    appointmentCount: doctor._count.appointments,
  }));
}

interface CreateDoctorInput {
  name: string;
  email: string;
  phone: string;
  speciality: string;
  gender: Gender;
  isActive: boolean;
}

export async function CreateDoctor(input: CreateDoctorInput) {
  try {
    if (!input.name || !input.email)
      throw new Error("Name and email are required");
    const doctor = await prisma.doctor.create({
      data: { ...input, imageUrl: generateAvatar(input.name, input.gender) },
    });
    revalidatePath("/admin");
    return doctor;
  } catch (e) {
    console.log("Error creating doctor:", e);
    throw e;
  }
}

interface UpdateDoctorInput extends Partial<CreateDoctorInput> {
  id: string;
}

export async function UpdateDoctor(input: UpdateDoctorInput) {
  try {
    if (!input.id) throw new Error("Doctor ID is required");
    const currentDoctor = await prisma.doctor.findUnique({
      where: { id: input.id },
      select: { email: true },
    });
    if (!currentDoctor) throw new Error("Doctor not found");
    if (input.email !== currentDoctor.email) {
      const existingDoctor = await prisma.doctor.findUnique({
        where: { email: input.email || "" },
      });
      if (existingDoctor) throw new Error("Email already in use");
    }
    const doctor = await prisma.doctor.update({
      where: { id: input.id },
      data: {
        name: input.name,
        email: input.email,
        phone: input.phone,
        speciality: input.speciality,
        gender: input.gender,
        isActive: input.isActive,
      },
    });
    return doctor;
  } catch (e) {
    console.log("Error updating doctor:", e);
    throw e;
  }
}
