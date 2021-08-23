import java.io.Serializable;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Data;

@Data
@Entity
public class Aerodrome implements Serializable{
		
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Integer id;
	
	@Column(length = 255, nullable = false)
	private String name;
	
	@Column(length = 255)
	private String city;
	
	@Column(length = 1023, nullable = false)
	private String description;
	
	@Temporal(TemporalType.DATE)
	private Date createdAt;

	@OneToMany(orphanRemoval = true, cascade = CascadeType.ALL)
	@JoinColumn(name = "id")
	private List<Runway> runways = new ArrayList<>();
	
}