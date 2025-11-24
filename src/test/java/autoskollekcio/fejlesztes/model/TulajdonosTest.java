package autoskollekcio.fejlesztes.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import java.util.ArrayList;

class TulajdonosTest {
    @Test
    void testTulajdonos() {
        Tulajdonos tulaj = new Tulajdonos();
        tulaj.setId(1L);
        tulaj.setNev("Pista");
        tulaj.setTelefon("+3630");
        tulaj.setAutok(new ArrayList<>());

        assertEquals(1L, tulaj.getId());
        assertEquals("Pista", tulaj.getNev());
        assertEquals("+3630", tulaj.getTelefon());
        assertNotNull(tulaj.getAutok());

        // Konstruktor teszt
        Tulajdonos tulaj2 = new Tulajdonos("Anna", "+3620");
        assertEquals("Anna", tulaj2.getNev());

        // Lombok metódusok
        assertNotNull(tulaj.toString());
        assertEquals(tulaj, tulaj);
        assertEquals(tulaj.hashCode(), tulaj.hashCode());
    }
}