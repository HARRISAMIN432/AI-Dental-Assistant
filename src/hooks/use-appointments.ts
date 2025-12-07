"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  getAppointments,
  AppointmentWithRelations,
} from "@/lib/actions/appointments";

export function useGetAppointments(): UseQueryResult<
  AppointmentWithRelations[]
> {
  return useQuery<AppointmentWithRelations[]>({
    queryKey: ["getAppointments"],
    queryFn: getAppointments,
  });
}
