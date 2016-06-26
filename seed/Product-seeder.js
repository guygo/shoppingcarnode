var Product=require('../models/Products');
var mongoose = require('mongoose');



mongoose.connect('mongodb://guy:zxccxz123@ds023704.mlab.com:23704/shoppingdb');


var products=[
    new Product({
    title: 'mortal kombat',
    ImageUrl:'https://upload.wikimedia.org/wikipedia/en/f/f2/Mortal_Kombat_-_Deception_Coverart.png' ,
    description:'Mortal Kombat: Deception is a fighting game developed and published by Midway as the sixth installment of the Mortal Kombat (MK) series. It was released for the PlayStation 2 and Xbox in October 2004.',
    price:45
    }),

    new Product({
        title: 'The Outlaw Josey Wales',
        ImageUrl:'https://s-media-cache-ak0.pinimg.com/236x/88/99/9f/88999ff7116af3490a5e91167e0e5997.jpg' ,
        description:'A Missouri farmer joins a Confederate guerrilla unit and winds up on the run from the Union soldiers who murdered his family.',
        price:25
    }),

    new Product({
        title: 'Harry Potter book series',
        ImageUrl:'http://prodimage.images-bn.com/pimages/9780545162074_p0_v2_s1200x630.jpg' ,
        description:'Rowling. The novels chronicle the life of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry. The main story arc concerns Harry\'s struggle against Lord Voldemort, the Dark wizard who intends to become immortal, overthrow the Ministry of Magic, subjugate non-magic people and destroy anyone who stands in his way.',
        price:55
    }),

    new Product({
        title: 'world of warcraft cataclysm',
        ImageUrl:'http://cdn.gamingangels.com/wp-content/uploads/2010/11/wowc-cover.jpg' ,
        description:'World of Warcraft (WoW) is a massively multiplayer online role-playing game (MMORPG) released in 2004 by Blizzard Entertainment. It is the fourth released game set in the fantasy Warcraft universe, which was first introduced by Warcraft: Orcs & Humans in 1994.[3] World of Warcraft takes place within the Warcraft world of Azeroth, approximately four years after the events at the conclusion of Blizzard\'s previous Warcraft release, Warcraft III: The Frozen Throne.[4] Blizzard Entertainment announced World of Warcraft on September 2, 2001.[5] The game was released on November 23, 2004, on the 10th anniversary of the Warcraft franchise.',
        price:32
    }),

    new Product({
        title: 'My Little Pony ',
        ImageUrl:'http://www.brony.com/wp-content/uploads/2013/07/My-Little-Pony-Friendship-Is-Magic-Plush-Toy-Doll.gif' ,
        description:'My Little Pony Friendship Is Magic Plush Toy Doll',
        price:32
    })

    ];



function seed(){
    var done=0;

    for(var i=0;i<products.length;i++){
    products[i].save(function(err,result){
    if(done===products.length)
    exit();
    });
}
function exit(){
    mongoose.disconnect();
}
}