import { areIntervalsOverlapping } from "date-fns";

import { Appointment } from "../../entities/appointment";
import { IAppointmentsRepository } from "../IAppointmentsRepository";

export class InMemoryAppointmentsRepository implements IAppointmentsRepository{

  public items: Appointment[] = [];

  async create(appointment: Appointment): Promise<void> {
      this.items.push(appointment)
  }

  async findOverlappingAppointment(startsAt: Date, endsAt: Date): Promise<Appointment | null> {
   
    // percorrendo todos os appointments e vendo quais estão conflitando com o que quero criar
    const overlappingAppointment = this.items.find(appointment => {
      return areIntervalsOverlapping(
        { start: startsAt, end: endsAt },
        { start: appointment.startsAt, end: appointment.endsAt},
        { inclusive: true} // pra ser menor ou igual
      )
    })

    if (!overlappingAppointment) {
      return null
    }

    return overlappingAppointment;
  }

}