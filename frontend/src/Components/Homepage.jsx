import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";



const Homepage = () => {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get("http://localhost:3001/recipes");
        setRecipes(res.data);
      } catch (err) {
        console.error("Error fetching recipes:", err);
      }
    };
    fetchRecipes();
  }, []);
  return (
    <div className="">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 shadow-md p-6 text-center">
        <h1 className="text-3xl font-bold text-white drop-shadow-lg">
          Share your Recipes...
        </h1>
        <p className="text-orange-100 mt-2 font-medium">
          Cook, Share & Relish Every Bite
        </p>
      </header>

      {/* Search Bar */}
      <div className="flex justify-center mt-6 px-4">
        <div className="w-full max-w-xl relative">
          <input
            type="text"
            placeholder="Search by recipe name..."
            className="w-full px-5 py-3 rounded-2xl border border-pink-300 shadow-md 
                       focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-700"
          />
          <button className="absolute right-3 top-2.5 text-pink-500 hover:text-purple-500 transition-colors">
            <Search size={24} />
          </button>
        </div>
      </div><br></br><br></br>

      {/* Slideshow Section (Bootstrap Carousel) */}
<div id="recipeCarousel" className="carousel slide mb-8" data-bs-ride="carousel">
  <div className="carousel-inner rounded-2xl shadow-lg">
    <div className="carousel-item active">
      <img src="welcom.jpg" className="d-block w-100 h-72 object-cover rounded-2xl" alt="Biriyani" />
    </div>
    <div className="carousel-item">
      <img src="next.png" className="d-block w-100 h-72 object-cover rounded-2xl" alt="Kerala Meals" />
    </div>
    <div className="carousel-item">
      <img src="bir.jpg" className="d-block w-100 h-72 object-cover rounded-2xl" alt="Spicy Noodles" />
    </div>
    <div className="carousel-item">
      <img src="chef.jpg" className="d-block w-100 h-72 object-cover rounded-2xl" alt="Cake" />
    </div>
    <div className="carousel-item">
      <img src="phn.jpg" className="d-block w-100 h-72 object-cover rounded-2xl" alt="Brownie" />
    </div>
  </div>

  {/* Controls */}
  <button className="carousel-control-prev" type="button" data-bs-target="#recipeCarousel" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#recipeCarousel" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>


      {/* Featured Section */}
      <section className="px-6 py-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
         Popular Recipes!
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Chicken Curry Card */}
          <Link to="/recipe/chicken-biriyani">
            <div className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer flex flex-col h-full">
              <img
                src="biriyani.jpg"
                alt="Chicken biriyani"
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <h3 className="text-lg font-bold">Chicken Biriyani</h3>
                <p className="text-gray-500 text-sm">
                  A spicy and flavorful Indian dish
                </p>
              </div>
            </div>
          </Link>

          <Link to="/recipe/kerala-meals">
  <div className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer flex flex-col h-full">
    <img
      src="meals.jpg"
      alt="Kerala Meals"
      className="w-full h-48 object-cover"
    />
    <div className="p-4 flex-1 flex flex-col justify-between">
      <h3 className="text-lg font-bold">Kerala Meals</h3>
      <p className="text-gray-500 text-sm">
        Traditional Kerala-style rice meal with curries and side dishes
      </p>
    </div>
  </div>
</Link>


        <Link to="/recipe/spicy-noodles">
  <div className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer flex flex-col h-full">
    <img
      src="noodles.jpg"
      alt="Spicy Noodles"
      className="w-full h-48 object-cover"
    />
    <div className="p-4 flex-1 flex flex-col justify-between">
      <h3 className="text-lg font-bold">Spicy Noodles</h3>
      <p className="text-gray-500 text-sm">
        Fiery Indo-Chinese noodles tossed in Schezwan sauce
      </p>
    </div>
  </div>
</Link>

        

          {/* Pasta Card */}
          <Link to="/recipe/pasta">
            <div className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer flex flex-col h-full">
              <img
                src="pasta.jpeg"
                alt="Pasta"
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <h3 className="text-lg font-bold">Creamy Pasta</h3>
                <p className="text-gray-500 text-sm">
                  Classic Italian pasta with rich sauce
                </p>
              </div>
            </div>
          </Link>

          {/* Cake Card */}
          <Link to="/recipe/cake">
            <div className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer flex flex-col h-full">
              <img
                src="cake.jpeg"
                alt="Cake"
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <h3 className="text-lg font-bold">Chocolate Cake</h3>
                <p className="text-gray-500 text-sm">
                  Moist, rich, and absolutely delicious
                </p>
              </div>
            </div>
          </Link>

          <Link to="/recipe/brownie">
  <div className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer flex flex-col h-full">
    <img
      src="brownie.jpg"
      alt="Brownie"
      className="w-full h-48 object-cover"
    />
    <div className="p-4 flex-1 flex flex-col justify-between">
      <h3 className="text-lg font-bold">Chocolate Brownie</h3>
      <p className="text-gray-500 text-sm">
        Rich and fudgy chocolate brownie with a soft center
      </p>
    </div>
  </div>
</Link>

        </div>
      </section>

      {/* Backend Latest Recipes Section */}
<section className="px-6 py-10">
  <h2 className="text-2xl font-semibold text-gray-700 mb-6">
    Latest Recipes
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {recipes.map((recipe) => (
      <Link to={`/recipe/${recipe._id}`} key={recipe._id}>
        <div className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer flex flex-col h-full">
          <div className="p-4 flex-1 flex flex-col justify-between">
            <h3 className="text-lg font-bold">{recipe.title}</h3>
            <p className="text-gray-500 text-sm">{recipe.description}</p>
             {/* Ingredients */}
            {recipe.ingredients && recipe.ingredients.length > 0 && (
              <div className="mt-2">
                <h4 className="font-semibold text-sm">Ingredients:</h4>
                <ul className="list-disc list-inside text-gray-600 text-sm">
                  {recipe.ingredients.map((ing, i) => (
                    <li key={i}>{ing}</li>
                  ))}
                </ul>
              </div>
            )}

            {/*  Instructions */}
            {recipe.steps&& recipe.steps.length > 0 && (
              <div className="mt-2 text-sm text-gray-700">
                <b>Steps:</b> {recipe.steps.join(", ")}
              </div>
            )}
          </div>
        </div>
      </Link>
    ))}
  </div>
</section>


    

      {/* Footer */}
      <footer className="bg-orange-500 text-white mt-10 rounded-t-2xl shadow-md">
  <div className="max-w-4xl mx-auto px-6 py-10 text-center md:text-left">
    
    {/* About Us */}
    <div>
      <h3 className="text-xl font-bold mb-3">About Us</h3>
      <p className="text-sm text-orange-100 mb-3">
        Our mission is to make everyday cooking fun, because we believe cooking is key 
        to a happier and healthier life for people, communities and the planet. 
        We empower home cooks all over the world to share recipes & cooking experiences.
      </p>

      {/* Keep See All */}
      <a href="#" className="text-sm text-white underline inline-block">
        See All
      </a>
    </div>
  </div>

  {/* Bottom Bar */}
  <div className="bg-orange-600 text-center py-3 text-sm">
    © 2025 Recipe Sharing Platform | Made by Rehana
  </div>
</footer>
    </div>
  );
};

export default Homepage;






