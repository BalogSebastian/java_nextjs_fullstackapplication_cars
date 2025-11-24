import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import AutokPage from '../app/autok/page'

// MOCK: Becsapjuk a fetch kérést
global.fetch = jest.fn(() =>
   Promise.resolve({
      json: () => Promise.resolve([
         {
            id: 1,
            tipus: 'Teszt BMW',
            gyartasiEv: 2020,
            uzemanyag: 'Benzin',
            valto: 'Automata',
            loero: 300,
            gyarto: { nev: 'BMW', orszag: 'Németország' },
            tulajdonos: { nev: 'Teszt Elek', telefon: '0630' }
         }
      ]),
      ok: true
   })
) as jest.Mock;

describe('AutokPage Komponens', () => {

   it('Megjeleníti a betöltés animációt induláskor', () => {
      render(<AutokPage />)
      // JAVÍTÁS: Most már ID alapján keressük a spinnert, nem szöveg alapján!
      const loadingElement = screen.getByTestId('loading-spinner')
      expect(loadingElement).toBeInTheDocument()
   })

   it('Megjeleníti az autókat a betöltés után', async () => {
      render(<AutokPage />)

      // Megvárjuk, amíg a betöltés eltűnik és megjelenik az adat
      await waitFor(() => {
         const autoElem = screen.getByText('Teszt BMW')
         expect(autoElem).toBeInTheDocument()
      })

      // Ellenőrizzük a lóerőt is
      const loeroElem = screen.getByText('300 LE')
      expect(loeroElem).toBeInTheDocument()
   })
})