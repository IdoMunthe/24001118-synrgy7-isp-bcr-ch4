class App {
  constructor() {
    this.tipeDriver = document.getElementById('tipe-driver')
    this.tanggal = document.getElementById('tanggal')
    this.availableAt = document.getElementById('available-at')
    this.jumlahPenumpang = document.getElementById('jumlah-penumpang')
    this.searchButton = document.getElementById('search-button')
    this.carContainerElement = document.getElementById("row-cars");
  }

  async init() {
    
    let self = this
    
    this.searchButton.addEventListener('click', async function() {
      await self.load()
      self.clear()
      self.run()
    });

    const disableButton = () => {
      self.searchButton.removeAttribute('disabled');
    }
    
    this.tipeDriver.addEventListener('change',  (event) => {
      if(event.target.value != '' && self.tanggal.value != '' && self.availableAt.value != '') {
        disableButton()
      }
    })
      
    this.tanggal.addEventListener('change',  (event) => {
      if(self.tipeDriver.value != '' && event.target.value != '' && self.availableAt.value != '') {
        disableButton()
      }
    })
    
    this.availableAt.addEventListener('change',  (event) => {
      if(self.tipeDriver.value != '' && self.tanggal.value != '' && event.target.value != '') {
        disableButton()
      }
    })
  }

  run = () => {
    Car.list.forEach((car) => {
      const node = document.createElement("div");
      node.classList.add('col-4')
      node.innerHTML = car.render();
      this.carContainerElement.appendChild(node);
    });
  };

  async load() {
    
    localStorage.removeItem('CARS')
    
    await Binar.listCars()
    
    const getCars = JSON.parse(localStorage.getItem('CARS'))
    
    console.log(getCars)
    
    const newCars = getCars.map((car) => {
      const listTipeDriver = ['dengan-sopir','tanpa-sopir']
      
      return {
        ...car,
        tipeDriver:listTipeDriver[(Math.floor(Math.random() * listTipeDriver.length))]
      }
    })
    
    const cars = newCars.filter((car) => {
      if(this.tipeDriver.value != '' && this.tanggal.value != '' && this.availableAt.value != '') {
        let tanggalUser = new Date(`${this.tanggal.value} ${this.availableAt.value}`)
        let tanggalMobil = new Date(car.availableAt)
        
        if(this.jumlahPenumpang.value != '') {
          if(tanggalMobil.getTime() >= tanggalUser.getTime() && this.tipeDriver.value == car.tipeDriver && car.capacity >= this.jumlahPenumpang.value) {
            return true
          }
        } else {
          if(tanggalMobil.getTime() >= tanggalUser.getTime() && this.tipeDriver.value == car.tipeDriver) {
            return true
          }
        }
      }
    })
    Car.init(cars);
  }

  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  };
}
