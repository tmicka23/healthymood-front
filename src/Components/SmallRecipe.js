import React, { useState } from 'react';
import recipesInfo from '../recipesInfo.json';
import { Link } from 'react-router-dom';
import '../Styles/SmallRecipe.css';
import emptyFav from '../Images/fav.png';
import fullFav from '../Images/fav-full.png';

const SmallRecipe = (props) => {
  const [addFavorite, setAddFavorite] = useState(false);

  return (
    <>
      {recipesInfo.recipe.map(r => {
        return (
          <div key={r.slug} className='small-recipe-global-container'>
            <span className='small-recipe-favorite-icon' onClick={() => setAddFavorite(!addFavorite)} style={{ backgroundImage: addFavorite ? `url(${fullFav})` : `url(${emptyFav})` }} />
            <Link to={`/recettes/${r.slug}`} key={r.slug} className='link-recette'>
              <div className='small-recipe-container'>
                <>
                  <div className='small-reciper-banner-image' style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1)), url(${require('../Images/' + r.image)}` }} />
                  <div className='small-recipe-content-container'>
                    <h1 className='small-recipe-title'>{r.title}</h1>
                    <p className='small-recipe-intro'>{r.intro}</p>
                    <button className='read-more'>
                      <p>Lire la suite</p>
                    </button>
                  </div>
                </>
              </div>
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default SmallRecipe;
