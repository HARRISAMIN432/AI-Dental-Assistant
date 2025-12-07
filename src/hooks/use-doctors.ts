"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import {
  getDoctors,
  DoctorWithAppointmentCount,
  UpdateDoctor,
} from "@/lib/actions/doctors";
import { CreateDoctor } from "@/lib/actions/doctors";

export function useGetDoctors(): UseQueryResult<DoctorWithAppointmentCount[]> {
  return useQuery<DoctorWithAppointmentCount[]>({
    queryKey: ["getDoctors"],
    queryFn: getDoctors,
  });
}

export function useCreateDoctor() {
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: CreateDoctor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getDoctors"] });
    },
    onError: (error) => console.log("Error while  creating a doctor", error),
  });

  return result;
}

export function useUpdateDoctor() {
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: UpdateDoctor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getDoctors"] });
    },
    onError: (error) => console.log("Error while  creating a doctor", error),
  });

  return result;
}
