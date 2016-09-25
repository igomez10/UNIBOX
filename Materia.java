class Materia {
	
	private Long id;
	private String crn;
	private String nombre;
	
	public String getCrn(){
		return this.crn;
	}
	
	public String getNombre(){
		return this.nombre;
	}
	
	public Long getId(){
		return this.id;
	}

	public void setCrn(String pCrn){
		this.crn=pCrn;
	}
	
	public void setNombre(String pNombre){
		this.nombre=pNombre;
	}
	
	public void setId(Long pId){
		this.id=pId;
	}



	public Materia(Long pId, String pCrn, String pNombre){
		this.id=pId;
		this.nombre=pNombre;
		this.crn=pCrn;
	}
	
	public String toString(){
		return  "{ id : " + id +
				", crn : \"" + crn +
				"\", nombre : \"" + nombre +
				" }" ;  
	}
	
}