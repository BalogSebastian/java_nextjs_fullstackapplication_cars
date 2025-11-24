package autoskollekcio.fejlesztes.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Tulajdonos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nev;       // Pl. Kovács János
    private String telefon;   // Pl. +3630...

    // KAPCSOLAT: Egy tulajnak sok autója van
    @OneToMany(mappedBy = "tulajdonos", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Auto> autok;

    // Kényelmi konstruktor
    public Tulajdonos(String nev, String telefon) {
        this.nev = nev;
        this.telefon = telefon;
    }
}