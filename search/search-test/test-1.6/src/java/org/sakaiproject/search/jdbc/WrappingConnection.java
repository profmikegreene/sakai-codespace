/**
 * Copyright (c) 2003-2009 The Apereo Foundation
 *
 * Licensed under the Educational Community License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *             http://opensource.org/licenses/ecl2
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * 
 */
package org.sakaiproject.search.jdbc;

import java.sql.Array;
import java.sql.Blob;
import java.sql.CallableStatement;
import java.sql.Clob;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.NClob;
import java.sql.PreparedStatement;
import java.sql.SQLClientInfoException;
import java.sql.SQLException;
import java.sql.SQLWarning;
import java.sql.SQLXML;
import java.sql.Savepoint;
import java.sql.Statement;
import java.sql.Struct;
import java.util.Map;
import java.util.Properties;

public class WrappingConnection implements Connection {
	private final Connection c;

	public WrappingConnection(Connection c) {
		this.c = c;
	}

	public void close() throws SQLException
	{
		c.close();
	}

	public void clearWarnings() throws SQLException
	{
		c.clearWarnings();
	}

	public void commit() throws SQLException
	{
		c.commit();
	}

	public Statement createStatement() throws SQLException
	{

		return c.createStatement();
	}

	public Statement createStatement(int resultSetType,
			int resultSetConcurrency) throws SQLException
	{
		return c.createStatement(resultSetType, resultSetConcurrency);
	}

	public Statement createStatement(int resultSetType,
			int resultSetConcurrency, int resultSetHoldability)
			throws SQLException
	{
		return c.createStatement(resultSetType, resultSetConcurrency,
				resultSetHoldability);
	}

	public boolean getAutoCommit() throws SQLException
	{
		return c.getAutoCommit();
	}

	public String getCatalog() throws SQLException
	{
		return c.getCatalog();
	}

	public int getHoldability() throws SQLException
	{
		return c.getHoldability();
	}

	public DatabaseMetaData getMetaData() throws SQLException
	{
		return c.getMetaData();
	}

	public int getTransactionIsolation() throws SQLException
	{
		return c.getTransactionIsolation();
	}

	public Map<String, Class<?>> getTypeMap() throws SQLException
	{
		return c.getTypeMap();
	}

	public SQLWarning getWarnings() throws SQLException
	{
		return c.getWarnings();
	}

	public boolean isClosed() throws SQLException
	{
		return c.isClosed();
	}

	public boolean isReadOnly() throws SQLException
	{
		return c.isReadOnly();
	}

	public String nativeSQL(String sql) throws SQLException
	{
		return c.nativeSQL(sql);
	}

	public CallableStatement prepareCall(String sql) throws SQLException
	{
		return c.prepareCall(sql);
	}

	public CallableStatement prepareCall(String sql, int resultSetType,
			int resultSetConcurrency) throws SQLException
	{
		return c.prepareCall(sql, resultSetType, resultSetConcurrency);
	}

	public CallableStatement prepareCall(String sql, int resultSetType,
			int resultSetConcurrency, int resultSetHoldability)
			throws SQLException
	{
		return c.prepareCall(sql, resultSetType, resultSetConcurrency,
				resultSetHoldability);
	}

	public PreparedStatement prepareStatement(String sql)
			throws SQLException
	{
		return c.prepareStatement(sql);
	}

	public PreparedStatement prepareStatement(String sql,
			int autoGeneratedKeys) throws SQLException
	{
		return c.prepareStatement(sql, autoGeneratedKeys);
	}

	public PreparedStatement prepareStatement(String sql,
			int[] columnIndexes) throws SQLException
	{
		return c.prepareStatement(sql, columnIndexes);
	}

	public PreparedStatement prepareStatement(String sql,
			String[] columnNames) throws SQLException
	{
		return c.prepareStatement(sql, columnNames);
	}

	public PreparedStatement prepareStatement(String sql,
			int resultSetType, int resultSetConcurrency)
			throws SQLException
	{
		return c.prepareStatement(sql, resultSetType,
				resultSetConcurrency);
	}

	public PreparedStatement prepareStatement(String sql,
			int resultSetType, int resultSetConcurrency,
			int resultSetHoldability) throws SQLException
	{
		return c.prepareStatement(sql, resultSetType,
				resultSetConcurrency, resultSetHoldability);
	}

	public void releaseSavepoint(Savepoint savepoint) throws SQLException
	{
		c.releaseSavepoint(savepoint);
	}

	public void rollback() throws SQLException
	{
		c.rollback();

	}

	public void rollback(Savepoint savepoint) throws SQLException
	{
		c.rollback(savepoint);

	}

	public void setAutoCommit(boolean autoCommit) throws SQLException
	{
		c.setAutoCommit(autoCommit);

	}

	public void setCatalog(String catalog) throws SQLException
	{
		c.setCatalog(catalog);

	}

	public void setHoldability(int holdability) throws SQLException
	{
		c.setHoldability(holdability);

	}

	public void setReadOnly(boolean readOnly) throws SQLException
	{
		c.setReadOnly(readOnly);

	}

	public Savepoint setSavepoint() throws SQLException
	{
		return c.setSavepoint();
	}

	public Savepoint setSavepoint(String name) throws SQLException
	{
		return c.setSavepoint(name);
	}

	public void setTransactionIsolation(int level) throws SQLException
	{
		c.setTransactionIsolation(level);

	}

	public void setTypeMap(Map<String, Class<?>> map) throws SQLException
	{
		c.setTypeMap(map);

	}

	@Override
	public Array createArrayOf(String typeName,
			Object[] elements) throws SQLException {
		return c.createArrayOf(typeName, elements);
	}

	@Override
	public Blob createBlob() throws SQLException {
		return c.createBlob();
	}

	@Override
	public Clob createClob() throws SQLException {
		return c.createClob();
	}

	@Override
	public NClob createNClob() throws SQLException {
		return c.createNClob();
	}

	@Override
	public SQLXML createSQLXML() throws SQLException {
		return c.createSQLXML();
	}

	@Override
	public Struct createStruct(String typeName,
			Object[] attributes) throws SQLException {
		return c.createStruct(typeName, attributes);
	}

	@Override
	public Properties getClientInfo() throws SQLException {
		return c.getClientInfo();
	}

	@Override
	public String getClientInfo(String name)
			throws SQLException {
		return c.getClientInfo(name);
	}

	@Override
	public boolean isValid(int timeout) throws SQLException {
		return c.isValid(timeout);
	}

	@Override
	public void setClientInfo(Properties properties)
			throws SQLClientInfoException {
		c.setClientInfo(properties);
	}

	@Override
	public void setClientInfo(String name, String value)
			throws SQLClientInfoException {
		c.setClientInfo(name, value);
	}

	@Override
	public boolean isWrapperFor(Class<?> iface)
			throws SQLException {
		return c.isWrapperFor(iface);
	}

	@Override
	public <T> T unwrap(Class<T> iface) throws SQLException {
		return c.unwrap(iface);
	}
}