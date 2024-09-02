export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "CardRace",
  description: "race with cards",
  mainNav: [],
  links: {
    github: "https://github.com/zohaib-a-ahmed/cardrace-fe",
  },
  rules: {
    sections: [
      {
        title: "Gameplay",
        items: [
          "CardRace is an online game where players are assigned four marbles and whoever gets all four into their safe zone wins.",
          "Each player is dealt a hand of cards to move individual marbles; some cards have special abilities!",
          "Develop strategies to move your marbles around the board before your opponents!",
        ]
      },
      {
        title: "Rules",
        items: [
          "A player's marbles begin in their color reserve, these marbles must be activated by using an Ace or a King.",
          "Marbles move clockwise around the board (unless otherwise) and when they come back to their starting point, they can enter their safe zone.",
          "If your marble lands on a space occupied by an opponent's marble, the opponent's marble is eliminated and returned to their reserve. This is true for all but newly activated marbles.",
          "Once a marble reaches its safe zone, it CANNOT be moved or displaced.",
          "Each round, players are randomly dealt a hand of cards depending on the number of players. This is 12 cards for 2-3 players and 6 for 4-6 players. Each round the cards are dealt, the size of the hand cyclically decreases.",
          "Cards move the distance of the card value for all except the case of face cards and certain numbers.",
          "Players can forfeit their hand at their turn until the next deal at any point in the game."
        ]
      },
      {
        title: "Special Cards",
        items: [
          "ACE: Can activate a marble, or move a marble 1 or 11 spaces.",
          "FOUR: Can move a marble forwards or backwards.",
          "SEVEN: Can be split among any number of a color's marbles. Eliminates any opponent's marble it passes over.",
          "JACK: Switch places between one of your marbles and any opponent's marble on the board.",
          "QUEEN: Move a marble 12 spaces.",
          "KING: Can activate a marble, or move a marble 13 spaces.",
          "JOKER: Can be used as any card. Player's choice of any card's value or special ability.",
        ]
      },
      {
        title: "Tips",
        items: [
          "Moving backwards can be super beneficial, just make sure to time it right!",
          "Eliminating an opponent as soon as you can might not always be the best idea.",
          "If an opponent is close to winning, consider repositioning someone else to stop them. The enemy of your enemy is your friend!",
        ]
      }
    ]
  }
}