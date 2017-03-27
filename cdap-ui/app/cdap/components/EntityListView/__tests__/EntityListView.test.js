/*
 * Copyright © 2017 Cask Data, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
*/

import React from 'react';
import {shallow, mount} from 'enzyme';
import {MemoryRouter, Route} from 'react-router-dom';

jest.mock('api/userstore');
jest.mock('api/search');
jest.mock('api/explore');
jest.mock('api/dataset');
jest.mock('api/app');
jest.mock('api/artifact');
jest.mock('api/metric');
jest.mock('api/program');
jest.mock('api/stream');
jest.mock('api/stream');
jest.mock('api/market');
jest.mock('api/preference');
jest.mock('api/pipeline');
jest.mock('api/namespace');
jest.mock('api/metadata');

jest.useFakeTimers();

import MyStoreApi from 'api/userstore';
import {MySearchApi} from 'api/search';
import NamespaceStore from 'services/NamespaceStore';
import NamespaceActions from 'services/NamespaceStore/NamespaceActions';
import EntityListView from 'components/EntityListView';

describe('Unit tests for EntityListView', () => {
  beforeEach(() => {
  });
  it('Should render', () => {
    let listview = shallow(
      <EntityListView />
    );
    expect(listview.find('.entity-list-view').length).toBe(1);
    listview.unmount();
  });
  it('Should render the empty message', () => {
    MyStoreApi.__setUserStore({
      property: {
        'user-has-visited': true
      }
    });
    let listview = shallow(
      <EntityListView />
    );
    jest.runAllTimers();
    let entitylistview = listview.find('.entity-list-view');
    let entitiescontainer = entitylistview.find('.entities-container');
    let homelistviewcontainer = entitiescontainer.find('.home-list-view-container');
    let entitiesallcontainer = homelistviewcontainer
      .dive() // escape hatch for not doing a full DOM rendering.
      .find('.entities-all-list-container');
    let emptyviewcontainer = entitiesallcontainer
      .children()
      .dive()
      .find('.empty-message-container');
    expect(entitylistview.length).toBe(1);
    expect(entitiescontainer.length).toBe(1);
    expect(homelistviewcontainer.length).toBe(1);
    expect(entitiesallcontainer.length).toBe(1);
    expect(emptyviewcontainer.length).toBe(1);
    expect(
      emptyviewcontainer
        .find('strong')
        .text()
    ).toBe('features.EntityListView.emptyMessage.default');
    expect(
      shallow(
        emptyviewcontainer.find('.empty-message-suggestions > span').nodes[0]
      ).text()
    ).toBe('features.EntityListView.emptyMessage.suggestion');
    listview.unmount();
  });
  it('Should show splashScreen', () => {
    MyStoreApi.__setUserStore({
      property: {}
    });
    let welcomescreen = shallow(
      <EntityListView />
    );
    jest.runAllTimers();
    let welcomescreencontainer = welcomescreen.dive();
    expect(welcomescreencontainer.find('.splash-screen-container').length).toBe(1);
    expect(welcomescreencontainer.find('.splash-screen-container .splash-screen-first-time').length).toBe(1);
    expect(welcomescreencontainer
      .find('.splash-screen-container .splash-screen-first-time h2.welcome-message')
      .text()
    ).toBe('features.EntityListView.SplashScreen.welcomeMessage1');
    expect(
      welcomescreencontainer
        .find('.splash-screen-container .splash-screen-first-time .cdap-fist-icon').length
    ).toBe(1);
    expect(
      welcomescreencontainer
        .find('.splash-screen-container .splash-screen-first-time .splash-screen-disclaimer').length
    ).toBe(1);
    welcomescreen.unmount();
  });
  it('Should show namespace error', () => {
    NamespaceStore.dispatch({
      type: NamespaceActions.updateNamespaces,
      payload: {
        namespaces: [{name: 'NS1'}, {name: 'NS2'}]
      }
    });
    NamespaceStore.dispatch({
      type: NamespaceActions.selectNamespace,
      payload: {
        selectedNamespace: 'NS3'
      }
    });
    let listview = mount(
      <MemoryRouter initialEntries={['/ns/NS1']}>
        <Route exact path="/ns/:namespace" component={EntityListView} />
      </MemoryRouter>
    );
    expect(listview.find('.page-not-found').length).toBe(1);
    expect(listview.find('.page-not-found img').prop('src')).toBe('/cdap_assets/img/404.png');
    expect(listview.find('.page-not-found .namespace-not-found').length).toBe(1);
    expect(listview.find('.page-not-found .namespace-not-found h4 strong').text()).toBe('features.EntityListView.NamespaceNotFound.optionsSubtitle');
    expect(listview.find('.page-not-found .namespace-not-found > div').get(1).textContent).toBe('features.EntityListView.NamespaceNotFound.switchMessage');
    expect(listview.find('.page-not-found .namespace-not-found div .open-namespace-wizard-link').text()).toBe('features.EntityListView.NamespaceNotFound.createLinkLabel');
    listview.unmount();
  });
  it('Should show Page error when navigating to an unknown page', () => {
    MyStoreApi.__setUserStore({
      property: {
        'user-has-visited': true
      }
    });
    NamespaceStore.dispatch({
      type: NamespaceActions.selectNamespace,
      payload: {
        selectedNamespace: 'NS1'
      }
    });
    MySearchApi.__setSearchResults({
      statusCode: 500,
      response: 'CDAP services are down.'
    }, true);
    let listview = mount(
      <MemoryRouter initialEntries={['/ns/NS1']}>
        <Route exact path="/ns/:namespace" component={EntityListView} />
      </MemoryRouter>
    );
    jest.runOnlyPendingTimers();
    let entitylistview = listview.find('.entity-list-view');
    let errorholder = entitylistview.find('.error-holder');
    let errormessage = errorholder.find('.empty-message.text-danger');
    let timercountdown = errormessage.find('.timer-countdown');
    const runTimer = (timerCount) => {
      for (let i =0; i< timerCount; i++) {
        jest.runOnlyPendingTimers();
      }
    };

    expect(errorholder.length).toBe(1);
    expect(errormessage.length).toBe(1);
    expect(timercountdown.text()).toBe("9");
    runTimer(9);
    expect(timercountdown.text()).toBe("59");
    runTimer(59);
    expect(timercountdown.text()).toBe("119");
    runTimer(119);
    expect(timercountdown.text()).toBe("299");
    runTimer(299);
    expect(timercountdown.text()).toBe("599");
    runTimer(599);
    expect(errormessage.find('span').nodes[1].textContent).toBe('features.EntityListView.Errors.timeOut');
  });
});
