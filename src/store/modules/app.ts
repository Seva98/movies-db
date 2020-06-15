import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '../index';

export interface IAppState {
  name: string;
}

@Module({ dynamic: true, store, name: 'app' })
class App extends VuexModule implements IAppState {
  public name = 'Media Database';

  @Mutation
  private CHANGE_NAME(newName: string) {
    this.name = newName;
  }

  @Action
  public changeName(newName: string) {
    this.CHANGE_NAME(newName);
  }
}

export const AppModule: App = getModule(App);
