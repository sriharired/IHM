import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/footer";
import historiesData from "../data/historiesdata.json";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #1e3c72, #f56b2a);
  font-family: "Arial", sans-serif;
  color: #ffffff;
  padding: 1.5rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: transparent;
  padding: 1rem;
  border-radius: 12px;

  h1 {
    text-align: center;
    font-size: 2rem;
    color: #ffffff;
    margin: 0;

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }

  img {
    width: 220px;
    height: 260px;
    border-radius: 12px;
    object-fit: cover;

    @media (max-width: 768px) {
      width: 180px;
      height: 220px;
    }
  }
`;

const DescriptionContainer = styled.div`
  margin-top: 4rem;
  background: #1e1e1e;
  padding: 1.5rem;
  border-radius: 12px;
  color: #f2cb05;
  flex: 1;

  p {
    font-size: 1.2rem;
    line-height: 1.6;
    text-align: justify;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }

  @media (max-width: 1024px) {
    margin-top: 1rem;
  }
`;

const CharactersAndHistoryWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3rem;
  justify-content: center;
  align-items: flex-start;
  margin: 2rem auto;
  max-width: 1200px;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
`;

const CharactersContainer = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: 2rem;
    font-weight: bold;
    color: #ffffff;
    text-align: center;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }

  div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;

    @media (max-width: 768px) {
      gap: 1rem;
    }
  }
`;

const CharacterCard = styled.div`
  background: ${({ isSelected }) =>
    isSelected ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.1)"};
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
  width: 150px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: ${({ isSelected }) =>
    isSelected ? "0px 0px 12px 4px rgba(255, 255, 255, 0.8)" : "none"};

  img {
    width: 150px;
    height: 200px;
    border-radius: 12px;
    margin-bottom: 0.5rem;
    object-fit: cover;

    @media (max-width: 768px) {
      width: 120px;
      height: 160px;
    }
  }

  div {
    font-size: 1rem;
    font-weight: bold;
    color: #ffffff;

    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
  }
`;

const HistoryBar = styled.div`
  flex: 1;
  background: #000000;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;


  h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: #ffffff;
    text-decoration: underline;

    @media (max-width: 768px) {
      font-size: 1.3rem;
    }
  }

  ul {
    list-style-type: none;
    padding: 0;

    li {
      margin-bottom: 1.5rem;
      font-size: 1.2rem;
      line-height: 1.6;

      @media (max-width: 768px) {
        font-size: 1rem;
      }

      a {
        text-decoration: none;
        font-weight: bold;
        cursor: pointer;
        color: ${({ historyId }) =>
          historyId === "ramayana"
            ? "#FFA500"
            : historyId === "bhagavad-gita"
            ? "#00FFFF"
            : historyId === "guru-granth-sahib"
            ? "#32CD32"
            : "#FFFFFF"};

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  @media (max-width: 1024px) {
    width: 90%;
  }
`;

const CharacterPage = () => {
  const { id, characterName } = useParams();
  const navigate = useNavigate();
  const titleRef = useRef(null);

  const history = historiesData.histories[id];
  const [selectedCharacter, setSelectedCharacter] = useState(
    history?.characters.find(
      (char) => char.name.toLowerCase() === characterName.toLowerCase()
    )
  );

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selectedCharacter]);

  const handleCharacterClick = (char) => {
    setSelectedCharacter(char);
    navigate(`/histories/${id}/characters/${char.name.toLowerCase()}`);
  };

  return (
    <PageWrapper>
      <ContentWrapper>
        <ImageContainer ref={titleRef}>
          <h1>{selectedCharacter.name}</h1>
          <img
            src={require(`../images/${selectedCharacter.img}`)}
            alt={selectedCharacter.name}
          />
        </ImageContainer>

        <DescriptionContainer>
          <p>{selectedCharacter.desc}</p>
        </DescriptionContainer>
      </ContentWrapper>

      <CharactersAndHistoryWrapper>

        <CharactersContainer>
          <h2>Characters</h2>
          <div>
            {history.characters.map((char) => (
              <CharacterCard
                key={char.name}
                isSelected={char.name === selectedCharacter.name}
                onClick={() => handleCharacterClick(char)}
              >
                <img
                  src={require(`../images/${char.img}`)}
                  alt={char.name}
                />
                <div>{char.name}</div>
              </CharacterCard>
            ))}
          </div>
        </CharactersContainer>

        <HistoryBar>
          <h3>HISTORIES</h3>
          <ul>
            {Object.keys(historiesData.histories).map((historyId) => (
              <li key={historyId}>
                <a
                  style={{
                    color:
                      historyId === "ramayana"
                        ? "#FFA500"
                        : historyId === "bhagavad-gita"
                        ? "#00FFFF"
                        : historyId === "guru-granth-sahib"
                        ? "#32CD32"
                        : "#FFFFFF",
                  }}
                  onClick={() => navigate(`/histories/${historyId}`)}
                >
                  {historiesData.histories[historyId].title}
                </a>
              </li>
            ))}
          </ul>
        </HistoryBar>
      </CharactersAndHistoryWrapper>
    </PageWrapper>
  );
};

export default CharacterPage;
