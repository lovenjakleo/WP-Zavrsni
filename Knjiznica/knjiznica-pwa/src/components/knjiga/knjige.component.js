import React, { Component } from "react";
import { Button, Container, Table } from "react-bootstrap";
import KnjigaDataService from "../../services/knjiga.service";
import { Link } from "react-router-dom";
import {FaEdit, FaTrash} from "react-icons/fa"


export default class Knjige extends Component{

    constructor(props){
        super(props);

        this.state = {
            knjige: []
        };

    }

    componentDidMount(){
        this.dohvatiKnjige();
    }

    async dohvatiKnjige(){

        await KnjigaDataService.get()
        .then(response => {
            this.setState({
                knjige: response.data
            });
            console.log(response.data);
        })
        .catch(e =>{
            console.log(e);
        });
    }

    async obrisiKnjigu(sifra){
        const odgovor = await KnjigaDataService.delete(sifra);
        if(odgovor.ok){
            this.dohvatiKnjige();
        }else{
            alert(odgovor.poruka);
        }
    }


    render(){

        const { knjige } = this.state;

        return (
            <Container>
               <a href="/knjige/dodaj" className="btn btn-success gumb">
                Dodaj novu knjigu
               </a>
                
               <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>isbn</th>
                        <th>naslov</th>
                        <th>autor</th>
                        <th>dostupna kolicina</th>
                       
                    </tr>
                </thead>
                <tbody>
                   { knjige && knjige.map((knjiga,index) => (

                    <tr key={index}>
                        <td>{knjiga.isbn}</td>
                        <td className="naslov">{knjiga.naslov}</td>
                        <td className="autor">{knjiga.autor}
                            
                               
                        </td>
                        <td className="sredina">{knjiga.dostupne_kolicine}</td>
                        <td>
                            <Link className="btn btn-primary gumb"
                            to={`/knjige/${knjiga.sifra}`}>
                                <FaEdit />
                            </Link>

                            <Button variant="danger" className="gumb"
                            onClick={()=>this.obrisiKnjigu(knjiga.sifra)}>
                                <FaTrash />
                            </Button>
                        </td>
                    </tr>

                   ))}
                </tbody>
               </Table>



            </Container>


        );
    }
}