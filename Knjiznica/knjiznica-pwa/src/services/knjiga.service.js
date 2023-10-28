import http from "../http-common";


class KnjigaDataService{

    async get(){
        return await http.get('/Knjiga');
    }

    async getBySifra(sifra) {
        return await http.get('/Knjiga/' + sifra);
      }

    async delete(sifra){
        const odgovor = await http.delete('/Knjiga/' + sifra)
        .then(response => {
            return {ok: true, poruka: 'Obrisao uspješno'};
        })
        .catch(e=>{
            return {ok: false, poruka: e.response.data};
        });

        return odgovor;
    }


    async post(knjiga){
        //console.log(smjer);
        const odgovor = await http.post('/knjiga',knjiga)
           .then(response => {
             return {ok:true, poruka: 'Unio knjigu'}; // return u odgovor
           })
           .catch(error => {
            //console.log(error.response);
             return {ok:false, poruka: error.response.data}; // return u odgovor
           });
     
           return odgovor;
    }

    async put(sifra,knjiga){
        //console.log(smjer);
        const odgovor = await http.put('/knjiga/' + sifra,knjiga)
           .then(response => {
             return {ok:true, poruka: 'Promjenio knjigu'}; // return u odgovor
           })
           .catch(error => {
            //console.log(error.response);
             return {ok:false, poruka: error.response.data}; // return u odgovor
           });
     
           return odgovor;
         }
        
}
const service=new KnjigaDataService();

export default service;