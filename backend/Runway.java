import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class Runway implements Serializable{

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Integer id;
	
	@Column(length = 10, nullable = false)
	private String name;
	
	@Column(nullable = false)
	private Integer width;
	
	@Column(nullable = false)
	private Integer length;
	
}
