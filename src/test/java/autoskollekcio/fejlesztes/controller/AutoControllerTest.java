package autoskollekcio.fejlesztes.controller;

import autoskollekcio.fejlesztes.model.Auto;
import autoskollekcio.fejlesztes.model.Gyarto;
import autoskollekcio.fejlesztes.model.Tulajdonos;
import autoskollekcio.fejlesztes.repository.AutoRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AutoController.class)
class AutoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private AutoRepository autoRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private Auto tesztAuto;

    @BeforeEach
    void setUp() {
        // Létrehozunk kamu szülőket, hogy ne legyen null
        Gyarto gyarto = new Gyarto("Audi", "Németország");
        Tulajdonos tulaj = new Tulajdonos("Jani", "+36");

        // Itt már az új szerkezetet használjuk:
        tesztAuto = new Auto(1L, "A4", 2020, "Dízel", "Automata", 190, gyarto, tulaj);
    }

    // ... A többi teszt metódus (testGetAutok, testCreateAuto stb.) maradhat ugyanaz! ...
    // ... Csak másold be ide őket az előző fájlból, vagy hagyd meg a régieket ...

    @Test
    void testGetAutok() throws Exception {
        when(autoRepository.findAll()).thenReturn(Arrays.asList(tesztAuto));
        mockMvc.perform(get("/api/autok"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].tipus").value("A4")); // Itt már tipus van, nem márka!
    }

    @Test
    void testGetAutoById() throws Exception {
        when(autoRepository.findById(1L)).thenReturn(Optional.of(tesztAuto));
        mockMvc.perform(get("/api/autok/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.tipus").value("A4"));
    }

    @Test
    void testCreateAuto() throws Exception {
        when(autoRepository.save(any(Auto.class))).thenReturn(tesztAuto);
        mockMvc.perform(post("/api/autok")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(tesztAuto)))
                .andExpect(status().isOk());
    }

    @Test
    void testUpdateAuto() throws Exception {
        when(autoRepository.findById(1L)).thenReturn(Optional.of(tesztAuto));
        when(autoRepository.save(any(Auto.class))).thenReturn(tesztAuto);
        mockMvc.perform(put("/api/autok/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(tesztAuto)))
                .andExpect(status().isOk());
    }

    @Test
    void testDeleteAuto() throws Exception {
        doNothing().when(autoRepository).deleteById(anyLong());
        mockMvc.perform(delete("/api/autok/1")).andExpect(status().isOk());
    }
}