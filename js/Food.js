class Food {
    constructor(){
        this.foodStock = 0;
        this.lastFed;
        this.image = loadImage("images/Milk.png");
    }
    
    updateFoodStock(foodStock){
        this.foodStock = foodStock ;
    }

    getFedTime(lastFed){
        this.lastFed = lastFed;
    }

    deductFood(){
        if(this.foodStock>0){
            this.foodStock = this.foodStock-1;
        }
    }

    getFoodStock(){
       return this.foodStock;
    }
    bedroom(){
        
    }
    display(){
        var x = 150, y = 100;
        //imageMode(CENTER);
        //image(this.image,720,220,70,70);
        if(lastFed>=12) {
            text("Last Feed:"+lastFed%12+"pm",325,40);
          }
           else if(lastFed == 0){
             text("Last Feed: 12am",325,40);
           }
           else{
             text("last Fed:"+lastFed+"am",325,40);
           }
           var x=70; y=100; 
           imageMode(CENTER);
         if(this.foodStock!=0){
            for(var i=0;i<this.foodStock;i++){
                if(i%10==0){
                    x=150;
                    y=y+75;
                }
                image(this.image,x,y,50,50);
                x=x+30;

            }
        }
    }
};