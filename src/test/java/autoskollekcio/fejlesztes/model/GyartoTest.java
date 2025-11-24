package autoskollekcio.fejlesztes.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import java.util.ArrayList;

class GyartoTest {
    @Test
    void testGyarto() {
        Gyarto gyarto = new Gyarto();
        gyarto.setId(1L);
        gyarto.setNev("BMW");
        gyarto.setOrszag("Németország");
        gyarto.setAutok(new ArrayList<>());

        assertEquals(1L, gyarto.getId());
        assertEquals("BMW", gyarto.getNev());
        assertEquals("Németország", gyarto.getOrszag());
        assertNotNull(gyarto.getAutok());

        // Konstruktor teszt
        Gyarto gyarto2 = new Gyarto("Audi", "Németország");
        assertEquals("Audi", gyarto2.getNev());

        // Lombok metódusok
        assertNotNull(gyarto.toString());
        assertEquals(gyarto, gyarto);
        assertNotEquals(gyarto, new Object());
        assertEquals(gyarto.hashCode(), gyarto.hashCode());
    }
}