import { expect, test } from "vitest";
import { Appointment } from "./appointment";
import { getFutureDate } from "../utils/get-future-date";

test("create an apointment", () => {

  const startsAt = getFutureDate("2023-08-27")
  const endsAt = getFutureDate("2023-08-28")

  const appointment = new Appointment({
    customer: "John Doe",
    startsAt,
    endsAt
  })

  expect(appointment).toBeInstanceOf(Appointment)
  expect(appointment.customer).toEqual("John Doe")
})

// Não podemos ter um appointment com a data de término menor que a data de início

test("cannot create appointment with end date before start date", () => {
  
  const startsAt = getFutureDate("2023-08-27")
  const endsAt = getFutureDate("2023-08-26")

  expect(() => {
    return new Appointment({
      customer: "John Doe",
      startsAt,
      endsAt
    }) 
  }).toThrow();
})

test("cannot create appointment with start date before now", () => {
  
  const startsAt = new Date();
  const endsAt = new Date();

  // colocando um dia a menos
  endsAt.setDate(startsAt.getDate() - 1)
  endsAt.setDate(endsAt.getDate() + 3)

  expect(() => {
    return new Appointment({
      customer: "John Doe",
      startsAt,
      endsAt
    }) 
  }).toThrow();
})