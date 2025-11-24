package autoskollekcio.fejlesztes.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Gyarto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nev;
    private String orszag;

    // KAPCSOLAT: Egy gyártónak sok autója van
    // A 'mappedBy' azt jelenti, hogy az Auto osztályban a 'gyarto' mezőnél keresse a kapcsolatot.
    // @JsonIgnore kell, különben végtelen ciklusba kerülne a kiíratás (Gyártó->Autó->Gyártó...)
    @OneToMany(mappedBy = "gyarto", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Auto> autok;

    // Kényelmi konstruktor
    public Gyarto(String nev, String orszag) {
        this.nev = nev;
        this.orszag = orszag;
    }
}