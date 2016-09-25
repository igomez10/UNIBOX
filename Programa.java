import java.util.*;

class Programa {

	private Long id;
	private String nombre;
	private ArrayList<Materia> materias;
	
	public Programa( Long pId,String pNombre){
		this.id=pId;
		this.nombre=pNombre;
		materias=new ArrayList<Materia>();
	}
	
	public Long getId(){
		return this.id;
	}
	
	public String getNombre(){
		return this.nombre;
	}
	public ArrayList<Materia> getMaterias(){
		return this.materias;
	}
	
	public void setId(Long pId){
		this.id=pId;
	}
	
	public void setNombre(String pNombre){
		this.nombre=pNombre;
	}
	
	public void setMaterias(ArrayList<Materia> pMaterias){
		this.materias=pMaterias;
	}
	
	public void agregarMateria(Materia pMateria){
		if(!materias.contains(pMateria)){
			materias.add(pMateria);
			return;
		}
		System.out.println("ya existia esa materia");
	}
	
	public void eliminarMateria(Materia pMateria){
		if(materias.contains(pMateria)){
			materias.remove(pMateria);
			return;
		}
		System.out.println("No existe esa materia a eliminar");
	}
	
	public String toString(){
			return  "{ id : " + id +
					", nombre : \"" + nombre +
					"\", materias : \"" + materias +
					" }" ;  
		}
	}
