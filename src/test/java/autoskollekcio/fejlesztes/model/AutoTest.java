package autoskollekcio.fejlesztes.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class AutoTest {
    @Test
    void testAuto() {
        Gyarto gyarto = new Gyarto("BMW", "DE");
        Tulajdonos tulaj = new Tulajdonos("Pista", "123");

        Auto auto = new Auto();
        auto.setId(1L);
        auto.setTipus("E46");
        auto.setGyartasiEv(2004);
        auto.setUzemanyag("Benzin");
        auto.setValto("Manuális");
        auto.setLoero(170);

        auto.setGyarto(gyarto);
        auto.setTulajdonos(tulaj);

        assertEquals(1L, auto.getId());
        assertEquals("E46", auto.getTipus());
        assertEquals(gyarto, auto.getGyarto());
        assertEquals(tulaj, auto.getTulajdonos());

        // Konstruktor teszt
        Auto auto2 = new Auto(1L, "A4", 2020, "Dízel", "Auto", 190, gyarto, tulaj);
        assertNotNull(auto2);

        // Lombok
        assertNotNull(auto.toString());
        assertEquals(auto, auto);
        assertEquals(auto.hashCode(), auto.hashCode());
    }
}