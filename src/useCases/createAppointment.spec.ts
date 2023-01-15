import { describe, expect, it } from "vitest";
import { CreateAppointment } from "./createAppointment";
import { Appointment } from "../entities/appointment";
import { getFutureDate } from "../utils/get-future-date";
import { InMemoryAppointmentsRepository } from "../repositories/in-memory/in-memory-appointments-repository";

// usado para fazer uma categorização dos testes
describe("Create Appointment", () => {

  // deveria ser possível criar um appointment
  it("should be able to create an appointment", () => {
    
    const startsAt = getFutureDate("2023-08-27")
    const endsAt = getFutureDate("2023-08-28")

    const appointmentsRepository = new InMemoryAppointmentsRepository();
    const createAppointment = new CreateAppointment(appointmentsRepository);
    
    expect(createAppointment.execute({
      customer: "John Doe",
      startsAt,
      endsAt
    })).resolves.toBeInstanceOf(Appointment)
    // espero que a promessa 'resolva'(não de erro) e que retorne uma instancia de appointment
  }) 

  it("should not be able to create an appointment with overlapping dates", async () => {
    
    const startsAt = getFutureDate("2023-08-10")
    const endsAt = getFutureDate("2023-08-15")
    
    const appointmentsRepository = new InMemoryAppointmentsRepository();
    const createAppointment = new CreateAppointment(appointmentsRepository);
    
    await createAppointment.execute({
      customer: "John Doe",
      startsAt,
      endsAt
    })
    
    expect(createAppointment.execute({
      customer: "John Doe",
      startsAt: getFutureDate("2023-08-14"),
      endsAt: getFutureDate("2023-08-18"),
    })).rejects.toBeInstanceOf(Error)
    // Eu espero que essa promessa de erro (inicia no meio e termina depois)

    expect(createAppointment.execute({
      customer: "John Doe",
      startsAt: getFutureDate("2023-08-08"),
      endsAt: getFutureDate("2023-08-12"),
    })).rejects.toBeInstanceOf(Error)
    // Eu espero que essa promessa de erro (inicia antes e termina no meio)
    
    expect(createAppointment.execute({
      customer: "John Doe",
      startsAt: getFutureDate("2023-08-08"),
      endsAt: getFutureDate("2023-08-17"),
    })).rejects.toBeInstanceOf(Error)
    // Eu espero que essa promessa de erro (inicia antes e termina depois)

    expect(createAppointment.execute({
      customer: "John Doe",
      startsAt: getFutureDate("2023-08-11"),
      endsAt: getFutureDate("2023-08-14"),
    })).rejects.toBeInstanceOf(Error)
    // Eu espero que essa promessa de erro (inicia no meio e termina um pouco depois, ainda no meio)
  }) 
})