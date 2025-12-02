package autoskollekcio.fejlesztes.controller;

import autoskollekcio.fejlesztes.model.Auto;
import autoskollekcio.fejlesztes.repository.AutoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/autok")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AutoController {

    private final AutoRepository autoRepository;

    @GetMapping
    public List<Auto> getAutok() {
        return autoRepository.findAll();
    }

    @GetMapping("/{id}")
    public Auto getAutoById(@PathVariable Long id) {
        return autoRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Auto createAuto(@RequestBody Auto auto) {
        return autoRepository.save(auto);
    }

    @PutMapping("/{id}")
    public Auto updateAuto(@PathVariable Long id, @RequestBody Auto frissitettAdatok) {
        return autoRepository.findById(id).map(auto -> {

            auto.setTipus(frissitettAdatok.getTipus());
            auto.setGyartasiEv(frissitettAdatok.getGyartasiEv());
            auto.setUzemanyag(frissitettAdatok.getUzemanyag());

            auto.setValto(frissitettAdatok.getValto());
            auto.setLoero(frissitettAdatok.getLoero());

            auto.setGyarto(frissitettAdatok.getGyarto());
            auto.setTulajdonos(frissitettAdatok.getTulajdonos());

            return autoRepository.save(auto);
        }).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void deleteAuto(@PathVariable Long id) {
        autoRepository.deleteById(id);
    }
}