import { Appointment } from "../entities/appointment";
import { IAppointmentsRepository } from "../repositories/IAppointmentsRepository";

interface CreateAppointmentRequest {
  customer: string;
  startsAt: Date;
  endsAt: Date;
}

type CreateAppointmentResponse = Appointment;

export class CreateAppointment {
  
  constructor (
    private appointmentsRepository: IAppointmentsRepository
  ){}

  async execute({
    customer, 
    startsAt, 
    endsAt
  }: CreateAppointmentRequest): Promise <CreateAppointmentResponse> {

    const overlappingAppointment = await this.appointmentsRepository.findOverlappingAppointment(
      startsAt,
      endsAt
    )

    if (overlappingAppointment) {
      throw new Error("Another appointment overlaps this appointment dates")
    }
    
    const appointment = new Appointment({
      customer, 
      startsAt, 
      endsAt
    });

    await this.appointmentsRepository.create(appointment)

    return appointment;
  }
}