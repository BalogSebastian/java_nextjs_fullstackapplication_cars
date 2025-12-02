package autoskollekcio.fejlesztes.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "autok")
public class Auto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tipus;       // Pl. E46
    private Integer gyartasiEv;
    private String uzemanyag;

    // VISSZATETTÜK EZEKET, HOGY NE LEGYEN PIROS A CONTROLLER:
    private String valto;
    private Integer loero;


    @ManyToOne
    @JoinColumn(name = "gyarto_id")
    private Gyarto gyarto;

    @ManyToOne
    @JoinColumn(name = "tulajdonos_id")
    private Tulajdonos tulajdonos;
}