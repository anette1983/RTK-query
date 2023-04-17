import { useGetPokemonByNameQuery } from 'redux/pokemon';
// добавляем импорт нашего хука и используем его
import { useState } from 'react';
import { Spinner } from 'components/Spinner/Spinner';
// в стейте будем хранить значение из формы

export const HomePage = () => {
  const [pokemonName, setPokemonName] = useState('');
  // const { data, error, isFetching, isError } =
  //   useGetPokemonByNameQuery(pokemonName);
  // если напишем так, то пойдет запрос с пустой строкой, чтобы этого избежать:
  const { data, error, isFetching, isError } = useGetPokemonByNameQuery(
    pokemonName,
    {
      skip: pokemonName === '',
      refetchOnFocus: true,
      // делает нов фетч после потери фокуса, можна еще на маунте итд
    }
  );

  // по сабмиту формы отправляем знач в стейт
  const handleSubmit = e => {
    e.preventDefault();
    setPokemonName(e.currentTarget.elements.pokemonName.value);
    e.currentTarget.reset();
  };
  return (
    <>
      {' '}
      <form autoComplete="off" onSubmit={handleSubmit}>
        <input type="text" name="pokemonName" />
        <button type="submit">Search</button>{' '}
      </form>
      {/* покажем спиннер пока грузит */}
      {isFetching && <Spinner />}
      {isError && <p>{error.data}</p>}
      {/* или */}
      {/* <p>
        // Упс, покемона с имененем <b>{pokemonName}</b> нет //{' '}
      </p> */}
      {/* выведем значение, чтобы видеть, что работает */}
      {/* <h1>{pokemonName}</h1> */}
      {/* выведем имя, если есть дата и если нет ошибки*/}
      {data && !isFetching && !isError && <h1>{data.name}</h1>}
    </>
  );
};

// import { useState } from 'react';
// import { useGetPokemonByNameQuery } from 'redux/pokemon';
// import { Spinner } from 'components/Spinner/Spinner';

// export const HomePage = () => {
//   const [pokemonName, setPokemonName] = useState('');
//   const { data, error, isFetching, isError } = useGetPokemonByNameQuery(
//     pokemonName,
//     {
//       skip: pokemonName === '',
//     }
//   );

//   const handleSubmit = e => {
//     e.preventDefault();
//     setPokemonName(e.currentTarget.elements.pokemonName.value);
//     e.currentTarget.reset();
//   };

//   const showNotFoundError = isError && error.originalStatus === 404;
//   const showPokemonData = data && !isFetching && !isError;

//   return (
//     <>
//       <form autoComplete="off" onSubmit={handleSubmit}>
//         <input type="text" name="pokemonName" />
//         <button type="submit">Search</button>
//       </form>

//       {isFetching && <Spinner />}

//       {showNotFoundError && (
//         <p>
//           Упс, покемона с имененем <b>{pokemonName}</b> нет
//         </p>
//       )}

//       {showPokemonData && <h1>{data.name}</h1>}
//     </>
//   );
// };
