import java.util.*;

class Unibox {
	
	private ArrayList<Programa> programas;
	
	public ArrayList<Programa> getProgramas(){
		return this.programas;
	}
	
	public void setArrayList(ArrayList<Programa> pProgramas){
		this.programas=pProgramas;
	}
	
	public void agregarPrograma(Programa pPrograma){
		if(!this.programas.contains(pPrograma)){
			this.programas.add(pPrograma);
			return;
		}
		System.out.println("Ya existe ese programa");
	}
	
	public void eliminarPrograma(Programa pPrograma){
		if(this.programas.contains(pPrograma)){
			this.programas.remove(pPrograma);
			return;
		}
		System.out.println("No existe el programa a eliminar");
	}
	
	public Unibox(){
		this.programas = new ArrayList<Programa>();
	}
	
	
	public static void main(String[] args) {
		
	}
}