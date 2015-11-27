Note
====

- React Hot Loader non sembra recepire al volo i metodi definiti con `name() => {}`. Però non sembrano più essere necessari, visto che pare esserci un autobinding da qualche parte (`babel-stage-0`?). Verificare anche in progetti reali.
- Indagare meglio funzionamento di autobinding, sembra non vedere `this` solo in caso di callback e per `console.log()` o debugging. Es:

      hasVotedFor(entry) {
        console.log(this.props.hasVoted);
        return this.props.hasVoted === entry;
      }

      render() {
        return (
          <div className="voting">
            <button
              disabled={() => { this.hasVotedFor(entry); }}
              onClick={this.hasVotedFor}
            >
              Vote
            </button>
          </div>
        );
      }
    durante il `render()` funziona, ma messo come callback su `onClick`, `this` risulta null.
- Il sistema di testing non sembra recepire i plugin passati con webpack (i.e. quando testo un componente non trova React). Trovare soluzione.
- `setProps()` e `replaceProps()` non sono disponibili se si usano le classi ES6. Chiamare nuovamente `renderIntoDocument` fa fallire il test sul funzionamento di `pure-render-mixin`, quindi per il momento torno alla sintassi con `createClass()`. Inoltre finchè babel non reintroduce la possibilità di usare decorators, i mixin rimangono impossibili per le classi ES6.
